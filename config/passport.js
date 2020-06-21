const passport = require("passport");
const mongoose = require("mongoose");
const User = require("../models/User");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

module.exports = function (passport) {
	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL: "http://localhost:3000/auth/google/callback",
			},
			function (accessToken, refreshToken, profile, cb) {
				User.findOrCreate({ googleId: profile.id }, function (
					err,
					user
				) {
					return cb(err, user);
				});
			}
		)
	);
};
