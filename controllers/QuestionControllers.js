import QuestionModel from '../models/Question.js';

export const create = async (req, res) => {
  try {
    const doc = new QuestionModel({
      title: req.body.title,
      text: req.body.text,
    });
    const question = await doc.save();
    res.json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Не удалось создать FAQ!'
    });
  }
}

export const remove = async (req, res) => {
  try {
    const questionId = req.params.id;
    QuestionModel.findByIdAndDelete({ _id: questionId })
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: 'FAQ не найден!',
          });
        }
        return res.json({
          success: true,
        })
      })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Не удалось получить FAQ!'
    })
  }
}

export const getAll = async (req, res) => {
  try {
    const question = await QuestionModel.find();
    res.json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Не удалось получить FAQ!'
    });
  }
}

export const getLimit = async (req, res) => {
  try {
    const question = await QuestionModel.find().limit(3)
    res.json(question)
  } catch (error) {
    console.error(error)
    res.status(400).json({
      message:'Не удаслось получить информацию!'
    })
  }
}