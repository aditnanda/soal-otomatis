const Question = require('../models').Question;

module.exports = {

  getById(req, res) {
    console.log(req.params.id)
    return Question
      .findByPk(req.params.id, {
        include: [],
      })
      .then((doc) => {
        if (!doc) {
          return res.status(404).send({
            status: false,

            message: 'Not Found',
            errors: 'Question Not Found',
          });
        }
        const status = {
          message: 'Success',
          questions: doc,
          errors: null
        }
        return res.status(200).send(status);
      })
      .catch((error) => {
        res.status(400).send({
          status: false,

          message: 'Bad Request',
          errors: error
        });
      });
  },

  list(req, res) {
    return Question
      .findAll({
        include: [],
        order: [
          ['createdAt', 'DESC']
        ],
      })
      .then(docs => {
        const questions = {
          status: true,

          message: 'Success',
          count: docs.length,
          questions: docs.map(doc => {
            return doc
          }),
          errors: null
        }
        res.status(200).send(questions);
      })
      .catch((error) => {
        res.status(400).send({
          message: 'Bad Request',
          errors: error
        });
      });
  },

  add(req, res) {

    if (req.body.question == null || req.body.level == null || req.body.answer_a == null || req.body.answer_b == null || req.body.answer_c == null || req.body.answer_d == null || req.body.key_answer == null || req.body.category == null) {
      return res.status(400).send({
        status: false,
        
        message: "Bad Request",
        errors: "All data is required!"
      });
    }

    if (!['a', 'b', 'c', 'd'].includes(req.body.key_answer)) {
      return res.status(400).send({
        status: false,
        
        message: "Bad Request",
        errors: "hanya pilihan a, b, c, dan d saja"
      });
    }

    if (!['easy', 'medium', 'hard'].includes(req.body.level)) {
      return res.status(400).send({
        status: false,
        
        message: "Bad Request",
        errors: "hanya pilihan easy, medium, dan hard saja"
      });
    }

    return Question
      .create({
        question: req.body.question,
        level: req.body.level,
        answer_a: req.body.answer_a,
        answer_b: req.body.answer_b,
        answer_c: req.body.answer_c,
        answer_d: req.body.answer_d,
        key_answer: req.body.key_answer,
        category: req.body.category,
      })
      .then((doc) => {
        const status = {
          status: true,

          message: 'Created',
          question: doc,
          errors: null
        }
        return res.status(201).send(status);
      })
      .catch((error) => {
        res.status(400).send({
          status: false,

          message: 'Bad Request',
          errors: error
        });
      });
  },

  update(req, res) {
    return Question
      .findByPk(req.params.id, {})
      .then(status => {
        if (!status) {
          return res.status(404).send({
            status: false,

            message: 'Bad Request',
            errors: 'Question Not Found',
          });
        }


        if (req.body.key_answer != null) {
          if (!['a', 'b', 'c', 'd'].includes(req.body.key_answer)) {
            return res.status(400).send({
              status: false,
              
              message: "Bad Request",
              errors: "hanya pilihan a, b, c, dan d saja"
            });
          }
        }
    

    if (req.body.level != null) {
      if (!['easy', 'medium', 'hard'].includes(req.body.level)) {
        return res.status(400).send({
          status: false,
          
          message: "Bad Request",
          errors: "hanya pilihan easy, medium, dan hard saja"
        });
      }
    }


        return status
          .update({
            question: req.body.question,
            level: req.body.level,
            answer_a: req.body.answer_a,
            answer_b: req.body.answer_b,
            answer_c: req.body.answer_c,
            answer_d: req.body.answer_d,
            key_answer: req.body.key_answer,
            category: req.body.category,
          })
          .then((doc) => {
            const status = {
              status: true,

              message: 'Success',
              question: doc,
              errors: null
            }
            return res.status(200).send(status);
          })
          .catch((error) => {
            res.status(400).send({
              status: false,

              message: 'Bad Request',
              errors: error
            });
          });
      })
      .catch((error) => {
        res.status(400).send({
          status: false,

          message: 'Bad Request',
          errors: error
        });
      });
  },

  delete(req, res) {
    return Question
      .findByPk(req.params.id)
      .then(status => {
        if (!status) {
          return res.status(400).send({
            status: false,

            message: 'Bad Request',
            errors: 'Question Not Found',
          });
        }

       

        return status
          .destroy()
          .then(() => res.status(200).send({
            status: true,

            message: 'Deleted successfully',
            errors: null,
          }))
          .catch((error) => {
            res.status(400).send({
              status: false,

              message: 'Bad Request',
              errors: error
            });
          });
      })
      .catch((error) => {
        res.status(400).send({
          status: false,

          message: 'Bad Request',
          errors: error
        });
      });
  },
}