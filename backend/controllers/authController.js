import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/User.js'

const signup = async (req, res) => {
  try {
    const username = req.body.username?.trim()
    const email = req.body.email?.trim().toLowerCase()
    const { password } = req.body

    if (!username || !email || !password) {
      return res.status(400).json({
        message: 'Username, email, and password are required'
      })
    }

    if (typeof password !== 'string' || password.length < 8) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters long'
      })
    }

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(409).json({
        message: 'Email is already registered',
      })
    }

    const hashedPassword = await bcrypt.hash(password, Number(process.env.ROUNDS))

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    })

    return res.status(201).json({
      message: 'Account created successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong while creating your account',
    })
  }
}

const login = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase()
    const { password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required',
      })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password',
      })
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    )

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid email or password',
      })
    }

    const accessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    )

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    )

    user.refreshToken = refreshToken
    await user.save()

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return res.status(200).json({
      message: 'Login successful',
      accessToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    })
  } catch (error) {
    console.error('Login error:', error.message)

    return res.status(500).json({
      message: 'Something went wrong while logging in',
    })
  }
}

const logout = async (req, res) => {
  const refreshToken = req.cookies?.jwt

  if (!refreshToken) {
    res.clearCookie('jwt', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    })

    return res.status(200).json({
        message: 'Logged out successfully',
    })
  }

  try {
    const user = await User.findOne({ refreshToken })

    if (user) {
      user.refreshToken = null
      await user.save()
    }

    res.clearCookie('jwt', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })

    return res.status(200).json({
        message: 'Logged out successfully',
    })
  } catch (error) {
    console.error('Logout error:', error.message)

    return res.status(500).json({
      message: 'Something went wrong while logging out',
    })
  }
}

export { signup, login, logout }
