const verifySignUpController = require('../api').verifySignUp;
const verifySignController = require('../api').verifySign;
const questionController = require('../api').question;
const generateResultController = require('../api').generateResult;
const verifyJwtTokenController = require('../api').verifyJwtToken;

module.exports = function (app) {

	//User Auth
	app.post('/api/auth/signup',
		[
			verifySignUpController.checkDuplicateUserNameOrEmail,
			verifySignUpController.checkRolesExisted
		],
		verifySignController.signup);

	app.post('/api/auth/signin', verifySignController.signin);

	//question
	app.get('/api/questions',
		questionController.list);
	
	app.get('/api/questions/:id',
		[verifyJwtTokenController.verifyToken,
			verifyJwtTokenController.isAdmin
		],
		questionController.getById);
	app.post('/api/questions',
		[verifyJwtTokenController.verifyToken,
			verifyJwtTokenController.isAdmin
		],
		questionController.add);
	app.put('/api/questions/:id',
		[verifyJwtTokenController.verifyToken,
			verifyJwtTokenController.isAdmin
		],
		questionController.update);
	app.delete('/api/questions/:id',
		[verifyJwtTokenController.verifyToken,
			verifyJwtTokenController.isAdmin
		],
		questionController.delete);

	app.get('/api/generate-results',
		generateResultController.list);
	app.get('/api/generate-results/:id',
		[verifyJwtTokenController.verifyToken,
			verifyJwtTokenController.isAdmin
		],
		generateResultController.getById);
	app.post('/api/generate-results',
		[verifyJwtTokenController.verifyToken,
			verifyJwtTokenController.isAdmin
		],
		generateResultController.add);
	app.delete('/api/generate-results/:id',
		[verifyJwtTokenController.verifyToken,
			verifyJwtTokenController.isAdmin
		],
		generateResultController.delete);
}