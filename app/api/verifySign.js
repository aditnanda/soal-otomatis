const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models/index');
const User = require('../models').User
const Role = require('../models').Role
const Op = db.Sequelize.Op;
const config = require('../config/configRoles');

module.exports = {
	signup(req, res) {
		if (req.body.email == null || req.body.name == null || req.body.password == null) {
			res.status(400).send({
				status: false,
				
				message: "Error",
				errors: "email,name,password is required!"
			});
			return;
		}
		return User
			.create({
				name: req.body.name,
				
				email: req.body.email,
				password: bcrypt.hashSync(req.body.password, 8)
			}).then(user => {
				Role.findAll({
					where: {
						name: {
							[Op.or]: req.body.roles
						}
					}
				}).then(roles => {
					console.log("roles : "+roles);

					user.setRoles(roles).then(() => {
						res.status(200).send({
							status: true,
							
							message: "User registered successfully!",
							errors: null,
						});
					});
				}).catch(err => {
					res.status(500).send({
						status: false,
						message: "Error",
						errors: err
					});
				});
			}).catch(err => {
				res.status(500).send({
					status: false,
					
					message: "Error",
					errors: err
				});
			})
	},

	signin(req, res) {
		if (req.body.email == null || req.body.password == null) {
			res.status(400).send({
				status: false,
				
				message: "Error",
				errors: "email,password is required!"
			});
			return;
		}
		return User
			.findOne({
				where: {
					email: req.body.email
				}
			}).then(user => {
				if (!user) {
					return res.status(404).send({
						status: false,
						
						accessToken: null,
						message: "Error",
						errors: "User Not Found."
					});
				}

				var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
				if (!passwordIsValid) {
					return res.status(401).send({
						status: false,
						
						accessToken: null,
						message: "Error",
						errors: "Invalid Password!"
					});
				}

				var token = 'Bearer ' + jwt.sign({
					id: user.id
				}, config.secret, {
					expiresIn: 86400 //24h expired
				});

				res.status(200).send({
					status: true,
					
					accessToken: token,
					message: "Success",
					data: user,
					errors: null
				});
			}).catch(err => {
				res.status(500).send({
					status: false,
					
					accessToken: null,
					message: "Error",
					errors: err
				});
			});
	}
}