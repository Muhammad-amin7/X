import jwt from 'jsonwebtoken'
import users from '../schema/users.js'

export const authuser = async (req, res, next) => {
      try {
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                  return res.status(401).send({ ok: false, status: 401, message: "Token not found" });
            }

            const token = authHeader.split(" ")[1];

            const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
            const thisUser = await users.findOne({ email: decoded.email });

            if (!thisUser) {
                  return res.status(401).send({ ok: false, status: 401, message: "User not found" });
            }

            req.user = thisUser;
            next();
      } catch (error) {
            console.error("❌ Error! Auth user middleware error:", error);
            return res.status(500).send({ ok: false, status: 500, message: "Internal server error" });
      }
};
