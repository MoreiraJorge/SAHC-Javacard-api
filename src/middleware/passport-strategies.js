import LocalStrategy from 'passport-local/lib/strategy.js'
import JwtStrategy from 'passport-jwt/lib/strategy.js'
import ExtractJwt from 'passport-jwt/lib/extract_jwt.js'
import bcrypt from 'bcrypt'
import { User } from '../models/index.js'

import passport from 'koa-passport'
import { applicationException } from '../helpers.js'

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

passport.use(
	new LocalStrategy(
		{ usernameField: 'email' },
		async (email, password, done) => {
			try {
				const user = await User.get(email)

				const isValid = bcrypt.compareSync(password, user.password)

				if (!isValid) {
					throw new applicationException('Authentication error', 401)
				}

				return done(null, user)
			} catch (e) {
				done(e)
			}
		},
	),
)

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.SECRET || 'secret'

passport.use(
	new JwtStrategy(opts, async function (jwt_payload, done) {
		try {
			const tokenPayload = jwt_payload
			const user = await User.get(tokenPayload.email)

			if (user.email !== tokenPayload.email) {
				throw new applicationException('Unhauthorized', 401)
			}

			done(null, user)
		} catch (e) {
			done(e)
		}
	}),
)
