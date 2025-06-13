import { Router } from 'express';
import passport from 'passport';
import { checkPassword, isValidEmail } from '../controllers/Auth/Login/login.js'
import { checkCode, sendCode, setPassword } from '../controllers/Auth/Login/reset password.js';
import { initialData, saveUser, verifyEmail } from '../controllers/Auth/Register/register.js';
import { authGoogle } from '../controllers/Auth/Social/Google.js';
import { authGithub } from '../controllers/Auth/Social/Github.js';
import { authuser } from '../middlewares/authUser.mid.js';
import { Profile } from '../controllers/Get informations/Profile.js';
import { createPost } from '../controllers/Posts/createPost.js';
import multer from "multer";
import { PostsForYou } from '../controllers/Posts/PostsForYou.js';
import { AddLike } from '../controllers/Posts/Like.js';
import { addComment } from '../controllers/Posts/addComment.js';
import { allComments } from '../controllers/Posts/allComments.js';
import { deletePost } from '../controllers/Posts/DeletePost.js';
import { addBookmark } from '../controllers/Posts/addBookmark.js';
import { bookmarks } from '../controllers/Get informations/Bookmarks.js';
import { follow } from '../controllers/Follow/Follow.controller.js';
import { postFollowings } from '../controllers/Posts/postFollowings.js';
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = Router();

// enter with google
router.get('/user/auth/google', (req, res, next) => {
      next();
}, passport.authenticate('google', { scope: ['email', 'profile'] }));


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

// reset password
router.get('/user/reset/:email', sendCode)
router.post('/user/reset/check', checkCode)
router.post('/user/reset/password', setPassword)

// get profile
router.get('/user/:id', authuser, Profile)

// post 
router.post('/posts', upload.single("image"), authuser, createPost)
router.delete('/post/:id', authuser, deletePost)
router.get('/posts/:limit', authuser, PostsForYou)
router.get('/posts/like/:id', authuser, AddLike)
router.get('/posts/followings/:limit', authuser, postFollowings)

// comments
router.post('/posts/comment', authuser, addComment)
router.get('/posts/comment/:id/:limit', authuser, allComments)

// bookmarks
router.get('/bookmarks', authuser, bookmarks)
router.put('/bookmarks/:id', authuser, addBookmark)

// followers
router.post('/follow/:id', authuser, follow)
// router.get('/following', authuser, following)
// router.get('/followers', authuser, followers)

export default router;