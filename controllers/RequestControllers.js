import RequestModel from '../models/Request.js';

export const create = async (req, res) => {
  try {
    const doc = new RequestModel({
      fullName: req.body.fullName,
      surname: req.body.surname,
      phone: req.body.phone,
      time: req.body.time,
      question: req.body.question
    });
    const question = await doc.save();
    res.json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Не удалось создать вопрос!'
    });
  }
}

export const remove = async (req, res) => {
  try {
    const questionId = req.params.id;
    RequestModel.findByIdAndDelete({ _id: questionId })
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: 'Отзыв не найден!',
          });
        }
        return res.json({
          success: true,
        })
      })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Не удалось получить вопрос!'
    })
  }
}

export const getAll = async (req, res) => {
  try {
    const question = await RequestModel.find();
    res.json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Не удалось получить вопрос!'
    });
  }
}