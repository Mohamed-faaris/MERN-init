import passport from "passport";


    new LocalStrategy((username, password, done) => {
      const user = users.find((u) => u.username === username);
      if (!user) 
        {
        return done(null, false, { message: 'Incorrect username.' });
      }
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {    
          return done(null, false, { message: 'Incorrect password.' });
        }
      });
    });
  
  // Serialize user
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  // Deserialize user
  passport.deserializeUser((id, done) => {
    const user = users.find((u) => u.id === id);
    done(null, user);
  });