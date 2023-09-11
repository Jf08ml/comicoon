import { verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  
  if (!token) {
    return res.status(403).json({ result: "error", message: "No token provided." });
  }

  try {
    const decodedToken = verify(token, JWT_SECRET);
    req.userId = decodedToken.id; // Adjuntamos el ID del usuario al objeto req
    next(); // Pasamos al siguiente middleware o controlador
  } catch (error) {
    return res.status(401).json({ result: "error", message: "Invalid token." });
  }
}

export default verifyToken;
