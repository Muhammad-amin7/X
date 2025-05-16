import users from "../../../schema/users.js";
import { createToken } from "../../../utils/createJsonWebTokken.js";

export const authGoogle = async (req, res) => {
      const email = req.user?.emails?.[1]?.value || req.user?.emails?.[0]?.value;
      console.log(email);

      try {
            const isExisting = await users.findOne({ email: email, provide: "google" });

            if (isExisting) {
                  const token = createToken({ id: isExisting._id });
                  return res.redirect(`${process.env.FRONTEND_URL}/token?token=${token}`);
            }
            else {
                  const newuser = new users({
                        name: req.user.displayName,
                        email: email,
                        photo: req.user.photos?.[0]?.value || "",
                        joined_time: new Date(),
                        provide: "google"
                  });
                  const token = createToken({ id: newuser._id });

                  await newuser.save();
                  return res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
            }
      } catch (error) {
            console.error("❌Error! Google Auth error:", error);
            return res.redirect(`${process.env.FRONTEND_URL}/`);
      }
};
