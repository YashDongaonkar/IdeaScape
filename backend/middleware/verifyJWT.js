import jwt from "jsonwebtoken"

// HEADER : Authorization: Bearer <your_access_token>

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Unauthorized: Access token is missing',
    })
  }

  const token = authHeader.split(' ')[1]

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        message: 'Forbidden: Invalid or expired access token',
      })
    }

    req.user = decoded
    next()
  })
}

export default verifyJWT
