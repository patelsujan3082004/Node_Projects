const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../models/Admin');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          const admin = await Admin.findOne({ email: email.toLowerCase() });

          if (!admin) {
            return done(null, false, { message: 'Invalid email or password' });
          }

          // ✅ Plain text comparison (FIX)
          if (password !== admin.password) {
            return done(null, false, { message: 'Invalid email or password' });
          }

          return done(null, admin);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((admin, done) => {
    done(null, admin._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const admin = await Admin.findById(id).select('-password');
      done(null, admin);
    } catch (err) {
      done(err);
    }
  });
};
