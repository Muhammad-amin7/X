import { Router } from 'express';
import passport from 'passport';
import { authgooglecallback } from '../controllers/authgooglecallback.js';

const router = Router();


// Google orqali autentifikatsiyaga yo'naltirish
router.get('/user/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

// Google'dan qaytgandan keyin foydalanuvchi ma'lumotlarini yuborish
router.get('/user/auth/google/callback',
      passport.authenticate('google', { failureRedirect: '/', session: false }),
      authgooglecallback
);


router.get('/auth/github', passport.authenticate('github', { scope: ['email', 'profile'] }));
router.get('/auth/github/callback',
      passport.authenticate('github', { failureRedirect: '/', session: false }),
      authgooglecallback
);


export default router;
