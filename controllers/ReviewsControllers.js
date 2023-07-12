import ReviewModel from '../models/Reviews.js';

export const create = async (req, res) => {
  try {
    const doc = new ReviewModel({
      title: req.body.title,
      text: req.body.text,
      author: req.body.author,
      imageUrl: req.body.imageUrl,
    });
    const review = await doc.save();
    res.json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Не удалось создать отзыв!'
    });
  }
}

export const remove = async (req, res) => {
  try {
    const reviewId = req.params.id;
    ReviewModel.findByIdAndDelete({ _id: reviewId })
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
      message: 'Не удалось получить отзыв!'
    })
  }
}

export const getAll = async (req, res) => {
  try {
    const reviews = await ReviewModel.find();
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Не удалось Получить отзывы!'
    });
  }
}