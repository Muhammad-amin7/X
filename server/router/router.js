import { Router } from 'express';
import passport from 'passport';
import { checkPassword, isValidEmail } from '../controllers/Auth/Login/Login.js';
import { checkCode, sendCode, setPassword } from '../controllers/Auth/Login/Reset Password.js';
import { initialData, saveUser, verifyEmail } from '../controllers/Auth/Register/register.js';
import { authGoogle } from '../controllers/Auth/Social/Google.js';
import { authGithub } from '../controllers/Auth/Social/Github.js';
import { authuser } from '../middlewares/authUser.mid.js';
import { Profile } from '../controllers/Get informations/Profile.js';
import { createPost } from '../controllers/Posts/createPost.js';

const router = Router();

// enter with google
router.get('/user/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
router.get('/user/auth/google/callback',
      passport.authenticate('google', { failureRedirect: '/', session: false }),
      authGoogle
);

// enter with github
router.get('/user/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/user/auth/github/callback',
      passport.authenticate('github', { failureRedirect: '/', session: false }),
      authGithub
);

// sigin with email
router.post('/user/auth/sigin', initialData);
router.post('/user/auth/sigin/code', verifyEmail)
router.post('/user/auth/sigin/password', saveUser)
router.post('/user/auth/check/email', isValidEmail)

// login with email
router.post('/user/auth/login', isValidEmail)
router.post('/user/auth/login/password', checkPassword)

// resert password 
router.get('/user/reset/:email', sendCode)
router.post('/user/reset/check', checkCode)
router.post('/user/reset/password', setPassword)

// get profile
router.get('/profile/show/:id', authuser, Profile)

// post 
router.post('/posts', authuser, createPost)



export default router;