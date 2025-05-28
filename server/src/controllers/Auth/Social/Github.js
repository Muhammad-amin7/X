import users from "../../../schema/users.js";
import { createToken } from "../../../utils/createJsonWebTokken.js";

export const authGithub = async (req, res) => {
  const email = req.user?.emails?.[1]?.value || req.user?.emails?.[0]?.value;
  const gitId = req.user?.id;

  try {
    let isExisting;

    if (email) {
      isExisting = await users.findOne({ email: email });
    } else {
      isExisting = await users.findOne({ github_id: gitId });
    }

    if (isExisting) {
      const token = createToken({ id: isExisting._id });
      return res.redirect(`${process.env.FRONTEND_URL}/token?token=${token}`);
    } else {
      const newuser = new users({
        name: req.user.displayName || req.user.displayName || "anionim user",
        email: email || null,
        photo: req.user.photos?.[0]?.value || "",
        joined_time: new Date(),
        provide: "github",
        github_id: gitId, 
      });

      await newuser.save();

      const token = createToken({ id: newuser._id });
      return res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
    }
  } catch (error) {
    console.error("❌Error! github Auth error:", error);
    return res.redirect(`${process.env.FRONTEND_URL}/`);
  }
};
