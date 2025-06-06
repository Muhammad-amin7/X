export const authGoogle = async (req, res) => {
      try {
            console.log("✅ Google auth callback ishlayapti");
            const email = req.user?.emails?.[0]?.value;
            console.log("🔍 Foydalanuvchi email:", email);

            if (!email) {
                  console.error("❌ Email topilmadi");
                  return res.redirect(`https://x-coral-five.vercel.app/?error=EmailNotFound`);
            }

            const isExisting = await users.findOne({ email: email, provide: "google" });
            console.log("🔎 Foydalanuvchi bazada mavjudligi:", isExisting ? "Ha" : "Yo‘q");

            if (isExisting) {
                  const token = createToken({ id: isExisting._id });
                  console.log("🔑 Token yaratildi:", token);
                  return res.redirect(`https://x-coral-five.vercel.app/token?token=${token}`);
            } else {
                  const newuser = new users({
                        name: req.user.displayName,
                        email: email,
                        photo: req.user.photos?.[0]?.value || "",
                        joined_time: new Date(),
                        provide: "google"
                  });

                  await newuser.save();
                  console.log("🆕 Yangi foydalanuvchi yaratildi:", newuser);

                  const token = createToken({ id: newuser._id });
                  console.log("🔑 Yangi token yaratildi:", token);
                  return res.redirect(`https://x-coral-five.vercel.app/token?token=${token}`);
            }
      } catch (error) {
            console.error("❌ Error! Google Auth callbackda xatolik:", error);
            return res.redirect(`https://x-coral-five.vercel.app/?error=AuthError`);
      }
};
