import LocalStrategy from 'passport-local/lib/strategy.js'
import passport from 'koa-passport'

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

passport.use(
	new LocalStrategy(
		{ usernameField: 'email' },
		async (email, password, done) => {
			try {
				const user = {
					email: email,
					password: password,
				}

				console.log('Passport local success!')
				//TODO: Find user

				//TODO: Compare hash
				return done(null, user)
			} catch (e) {
				done(error)
			}
		},
	),
)
