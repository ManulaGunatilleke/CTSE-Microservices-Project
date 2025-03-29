const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const User = require('./models/student');
const jwt = require('jsonwebtoken');

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: '/google-auth/google/callback',
  scope: ['profile', 'email'],
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ Email: profile.emails[0].value });

    if (!user) {
      user = new User({
        googleId: profile.id,
        Fullname: profile.displayName,
        Email: profile.emails[0].value,
        Type: 'student',
        Password: ''
      });
      await user.save();
    }

    // const token = jwt.sign({ email: user.Email, type: user.Type }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    // console.log(user, token)
    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
