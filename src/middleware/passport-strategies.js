import LocalStrategy from 'passport-local/lib/strategy.js'
import JwtStrategy from 'passport-jwt/lib/strategy.js'
import ExtractJwt from 'passport-jwt/lib/extract_jwt.js'

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

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.SECRET || 'secret'

passport.use(
	new JwtStrategy(opts, function (jwt_payload, done) {
		//TODO: Use verify
		console.log('payload received', jwt_payload)
		done(null, {
			user: 'test',
		})
	}),
)
