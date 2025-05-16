import jwt from 'jsonwebtoken'

export const createToken = (info) => {
      const token = jwt.sign(info, process.env.TOKEN_SECRET_KEY, { expiresIn: '30d' })
      return token
}