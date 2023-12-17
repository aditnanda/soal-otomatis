const User = require('../models').User
const config = require('../config/configRoles.js');
const ROLEs = config.ROLEs;

module.exports = {
	checkDuplicateUserNameOrEmail(req, res, next) {

		if (req.body.email == null) {
			res.status(400).send({
				status: false,
				
				message: "Error",
				errors: "email is required!"
			});
			return;
		}

		User.findOne({
			where: {
				email: req.body.email
			}
		}).then(user => {
			if (user) {
				res.status(400).send({
					status: false,
					
					message: "Error",
					errors: "Email is already taken!"
				});
				return;
			}
			next();
		});
	},

	checkRolesExisted(req, res, next) {
		if (req.body.roles == null) {
			res.status(400).send({
				status: false,
				
				message: "Error",
				errors: "roles is required!"
			});
			return;
		}

		for (let i = 0; i < req.body.roles.length; i++) {
			if (!ROLEs.includes(req.body.roles[i].toUpperCase())) {
				res.status(400).send({
					status: false,
					
					message: "Error",
					errors: "Does NOT exist Role = " + req.body.roles[i]
				});
				return;
			}
		}
		next();
	}
}