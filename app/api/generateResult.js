const GenerateResult = require('../models').GenerateResult;
const Question = require('../models').Question;
const db = require('../models/index');
const sequelize = db.sequelize;
const { Op } = require('sequelize');

module.exports = {

  getById(req, res) {
    console.log(req.params.id)
    return GenerateResult
      .findByPk(req.params.id, {
        include: [],
      })
      .then(async (doc) => {
        if (!doc) {
          return res.status(404).send({
            status: false,

            message: 'Not Found',
            errors: 'GenerateResult Not Found',
          });
        }else{
          await Question.findAll({
            where: {
              id: {
                [Op.in]: JSON.parse(doc.questions) // Menggunakan operator in untuk mencocokkan ID dalam array
              }
            }
          }).then(result => {
            doc.questions = result
            const status = {
              message: 'Success',
              generate_results: doc,
              errors: null
            }
            return res.status(200).send(status);
          });

          
          
        }

        
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
    return GenerateResult
      .findAll({
        include: [],
        order: [
          ['createdAt', 'DESC']
        ],
      })
      .then(docs => {
        const generate_results = {
          status: true,

          message: 'Success',
          count: docs.length,
          generate_results: docs.map(doc => {
            return doc
          }),
          errors: null
        }
        res.status(200).send(generate_results);
      })
      .catch((error) => {
        res.status(400).send({
          message: 'Bad Request',
          errors: error
        });
      });
  },

  async add(req, res) {

    if (req.body.easy == null || req.body.hard == null || req.body.medium == null || req.body.count == null) {
      return res.status(400).send({
        status: false,

        message: "Bad Request",
        errors: "All data is required!"
      });
    } else {
      if ((parseInt(req.body.easy) + parseInt(req.body.hard) + parseInt(req.body.medium)) != parseInt(req.body.count)) {
        return res.status(400).send({
          status: false,

          message: "Bad Request",
          errors: "Jumlah soal keseluruhan level harus sama dengan soal yang diminta!"
        });
      } else {
        let condition = {}; // Kondisi awal (kosong)
    
        if (req.body.category != null) {
          // Jika 'category' tidak null, tambahkan kondisi pencarian berdasarkan 'category'
          condition = { category: req.body.category };
        }


        // cek jumlah soal level easy
        await Question.count({
          where: {
            [Op.and]: [
              {
                level: 'easy',
              },
              condition
            ]
          }
        }).then((data) => {
          console.log(data);
          if (parseInt(data) < parseInt(req.body.easy)) {
            return res.status(400).send({
              status: false,

              message: "Bad Request",
              errors: "Jumlah soal level easy hanya " + data
            });
          }
        });

        // cek jumlah soal level medium
        await Question.count({
          where: {
            [Op.and]: [
              {
                level: 'medium',
              },
              condition
            ]
          }
        }).then((data) => {
          console.log(data);
          if (parseInt(data) < parseInt(req.body.medium)) {
            return res.status(400).send({
              status: false,

              message: "Bad Request",
              errors: "Jumlah soal level medium hanya " + data
            });
          }
        });

        // cek jumlah soal level hard
        await Question.count({
          where: {
            [Op.and]: [
              {
                level: 'hard',
              },
              condition
            ]
          }
        }).then((data) => {
          console.log(data);
          if (parseInt(data) < parseInt(req.body.hard)) {
            return res.status(400).send({
              status: false,

              message: "Bad Request",
              errors: "Jumlah soal level hard hanya " + data
            });
          }
        });

        
        const easyQuestions = await Question.findAll({
          where: {
            [Op.and]: [
              {
                level: 'easy',
              },
              condition
            ]
          },
          order: sequelize.random(),
          limit: parseInt( req.body.easy)
        });
    
        const mediumQuestions = await Question.findAll({
          where: {
            [Op.and]: [
              {
                level: 'medium',
              },
              condition
            ]
          },
          order: sequelize.random(),
          limit: parseInt(req.body.medium)
        });
    
        const hardQuestions = await Question.findAll({
          where: {
            [Op.and]: [
              {
                level: 'hard',
              },
              condition
            ]
          },
          order: sequelize.random(),
          limit: parseInt(req.body.hard)
        });

        // Menggabungkan semua hasil pencarian ke dalam satu array
        const allQuestions = easyQuestions.concat(mediumQuestions, hardQuestions);

        // Mengacak urutan dari array yang dihasilkan
        const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);

        const questionIds = [];
        shuffledQuestions.forEach(question => {
          questionIds.push(question.id); // Menyimpan id dari setiap objek ke dalam array
        });

        return GenerateResult
          .create({
            easy: req.body.easy,
            medium: req.body.medium,
            hard: req.body.hard,
            count: req.body.count,
            category: req.body.category,
            questions: JSON.stringify(questionIds),
          })
          .then((doc) => {
            const status = {
              status: true,

              message: 'Created',
              generate_results: doc,
              errors: null
            }
            return res.status(201).send(status);
          })
          .catch((error) => {
            return res.status(400).send({
              status: false,

              message: 'Bad Request',
              errors: error
            });
          });
      }
    }




  },

  delete(req, res) {
    return GenerateResult
      .findByPk(req.params.id)
      .then(status => {
        if (!status) {
          return res.status(400).send({
            status: false,

            message: 'Bad Request',
            errors: 'GenerateResult Not Found',
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