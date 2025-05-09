import { Router } from 'express';
import passport from 'passport';
import { siginCheckEmail } from '../controllers/register by email/checkEmail.js';
import { siginUser } from '../controllers/register by email/saveUser.js';
import { siginSaveInfo } from '../controllers/register by email/saveInfos.js';
import { authgooglecallback } from '../controllers/Auth by Social/authgooglecallback.js';
import { existingEmail } from '../controllers/register by email/existingEmail.js';
import { checkLoginEmail } from '../controllers/Login by email/existingEmail.js';
import { checkLoginPass } from '../controllers/Login by email/checkPass.js';

const router = Router();

// enter with google
router.get('/user/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
router.get('/user/auth/google/callback',
      passport.authenticate('google', { failureRedirect: '/', session: false }),
      authgooglecallback
);

// enter with github
router.get('/user/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/user/auth/github/callback',
      passport.authenticate('github', { failureRedirect: '/', session: false }),
      authgooglecallback
);

// sigin with email
router.post('/user/auth/sigin', siginSaveInfo);
router.post('/user/auth/sigin/code', siginCheckEmail)
router.post('/user/auth/sigin/password', siginUser)
router.post('/user/auth/check/email', existingEmail)

// login with email
router.post('/user/auth/login', checkLoginEmail)
router.post('/user/auth/login/password', checkLoginPass)

export default router;
