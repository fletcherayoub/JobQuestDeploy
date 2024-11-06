import express from 'express';
import {login, register, logout, getUser} from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/auth.js';
import { sendToken } from '../utils/jwtToken.js';
import passport from '../passport/passport.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/register', register);
router.post('/login', login);
router.get('/logout', isAuthenticated, logout);
router.get('/getUser', isAuthenticated, getUser);


// get user data after login or signup by Oauth
router.get("/userData", isAuthenticated, (req, res) => {
  console.log("req userdata", req.user);
  res.send(req.user);
});
// Google OAuth routes new version to support mobile and web
// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    // Set the JWT cookie manually
    const token = req.user.getJWTToken();
    res.cookie("token", token, {
      expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });

    // Redirect to the frontend callback URL
    res.redirect("https://jobquestgov.netlify.app/oauth-callback");
  }
);

export default router;