import users from "../../../schema/users.js";
import { createToken } from "../../../utils/createJsonWebTokken.js";

export const authGoogle = async (req, res) => {
      try {
            const email = req.user?.emails?.[0]?.value;

            const isExisting = await users.findOne({ email: email, provide: "google" });

            if (isExisting) {
                  const token = createToken({ id: isExisting._id });
                  return res.redirect(`${process.env.FRONTEND_URL}/token?token=${token}`);
            } else {
                  const newuser = new users({
                        name: req.user.displayName,
                        email: email,
                        photo: req.user.photos?.[0]?.value || "",
                        joined_time: new Date(),
                        provide: "google"
                  });

                  await newuser.save();

                  const token = createToken({ id: newuser._id });
                  return res.redirect(`${process.env.FRONTEND_URL}/token?token=${token}`);
            }
      } catch (error) {
            console.error("❌ Error! Google Auth callbackda xatolik:", error);
            return res.redirect(`${process.env.FRONTEND_URL}/token?token=${token}&error=AuthError`);
      }
};