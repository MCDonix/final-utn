import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

// analizar el token:
// para analizar de que existe
// para analizar si es valido (clave secreta)
// para analizar si no está vencido (timpo de expiración)
// let permiso = "test-del-token"

const protect = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

  try {
    const header = req.headers.authorization
    const token = header?.split(" ")[1]

    console.log(header)

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is required"
      })
    }

    const secretKey = process.env.JWT_SECRET!

    // validar token
    const decode = jwt.verify(token, secretKey)

    if (decode) {
      console.log("Puedes pasar")
      next()
    }
  } catch (error) {
    const err = error as Error
    console.log(err.message)
    if (err.message === "invalid signature") {
      return res.status(500).json({
        success: false,
        message: "Invalid secret key"
      })
    }
    res.status(500).json({
      success: false,
      message: "Jsonwebtoken expired"
    })
  }
}

export { protect }
