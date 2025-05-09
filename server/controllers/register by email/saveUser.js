import pendingUsers from "../../schema/pendingUsers.js";
import users from "../../schema/users.js";
import { createToken } from "../../utils/createJsonWebTokken.js";

export const siginUser = async (req, res) => {
      const { email, password } = req.body;

      try {

            if (!email || !password) {
                  return res.status(400).json({ message: "Email va parol kerak." });
            }

            const otherDetails = await pendingUsers.findOne({ email: email });

            if (!otherDetails) {
                  return res.status(404).json({ message: "Foydalanuvchi topilmadi." });
            }

            console.log(otherDetails);

            const savedUser = await new users({
                  name: otherDetails.name,
                  password: password,
                  email: email,
                  bio: null,
                  photo: null,
                  joined_time: new Date(),
                  provide: "email",
                  birthday: otherDetails.birthday,
            }).save();

            const token = createToken({ id: savedUser._id })
            await pendingUsers.deleteOne({ email: email });

            return res.status(201).json({ ok: true, message: "Foydalanuvchi yaratildi", access_token: token });

      } catch (error) {
            console.error("Xatolik:", error);
            return res.status(500).json({ message: "Server xatosi" });
      }
};
