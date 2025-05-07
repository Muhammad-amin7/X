import users from '../schema/users.js';

export const authgoogle = async (req, res) => {
      try {
            const { google_id, name, email, photo } = req.user;


            let user = await users.findOne({ google_id });

            if (!user) {
                  user = new users({
                        name,
                        email,
                        google_id,
                        photo,
                        provider: 'google',
                  });

                  await user.save();
            }

            req.login(user, (err) => {
                  if (err) {
                        return res.status(500).json({ ok: false, message: 'Login failed' });
                  }
                  res.status(200).json({ ok: true, message: 'Login successful', user });
            });
      } catch (error) {
            console.error('Error during Google authentication:', error);
            res.status(500).send('Server error');
      }
};
