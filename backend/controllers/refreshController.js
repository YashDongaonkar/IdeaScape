import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const refresh = async (req, res) => {
  const refreshToken = req.cookies?.jwt

  if (!refreshToken) {
    return res.status(401).json({
      message: 'Refresh token is missing',
    })
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    )

    const user = await User.findById(decoded.id)

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({
        message: 'Invalid refresh token',
      })
    }

    const accessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    )

    return res.status(200).json({
      accessToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    })
  } catch (error) {
    return res.status(403).json({
      message: 'Invalid or expired refresh token',
    })
  }
}

export { refresh }
