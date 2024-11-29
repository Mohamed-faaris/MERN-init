import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../models/models.mjs";
import { comparePassword } from "../utils/passwordHelpers.mjs";

passport.serializeUser((user, done) => {
	done(null, user.email);
});

passport.deserializeUser(async (userEmail, done) => {
	try {
		const user = await User.findOne({email:userEmail});
		if (!user) throw new Error("User Not Found");
		done(null, user);
	} catch (err) {
		done(err, null);
	}
});

export default passport.use(
	new Strategy({usernameField:"email"},async (userEmail, password, done) => {
		try {
			const user = await User.findOne({ email:userEmail });
			if (!user) 
                throw new Error("User not found");
			if (!comparePassword(password, user.passwordHash))
				throw new Error("Bad Credentials");
			done(null, user);
		} catch (err) {
			done(err, null);
		}
	})
);
