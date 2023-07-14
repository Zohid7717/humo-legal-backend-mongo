import PostModel from '../models/Post.js';

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      paramTree: req.body.paramTree,
      category: req.body.category,
      imageUrl: req.body.imageUrl,
    });
    const post = await doc.save();
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось создать статью!',
    });
  }
}

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findByIdAndDelete({ _id: postId })
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: 'Статья не найдена!',
          });
        }
        return res.json({
          success: true,
        });
      })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить статью!',
    })
  }
}

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить статьи!'
    });
  }
}

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findById(postId);
    res.json({ post })
  } catch (error) {
    console.log((error));
    res.status(400).json({
      message: 'Статья не найдена!'
    })
  }
}

export const getByCategory = async (req, res) => {
  try {
    const posts = await PostModel.find({ category: req.body.category });
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить статьи!'
    });
  }
}