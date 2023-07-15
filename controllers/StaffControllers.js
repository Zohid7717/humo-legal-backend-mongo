import StaffModel from '../models/Staff.js'

export const create = async (req, res) => {
  try {
    const doc = new StaffModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
    });
    const staff = await doc.save();
    res.json(staff);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось создать информацию!',
    });
  }
}

export const remove = async (req, res) => {
  try {
    const staffId = req.params.id;
    StaffModel.findByIdAndDelete({ _id: staffId })
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: 'Сотрудник не найдена!',
          });
        }
        return res.json({
          success: true,
        })
      })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить информацию!'
    })
  }
}

export const getAll = async (req, res) => {
  try {
    const staff = await StaffModel.find();
    res.json(staff);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить информацию!'
    })
  }
}

export const getOne = async (req, res) => {
  try {
    const staffId = req.params.id;
    const staff = await StaffModel.findById(staffId);
    res.json({ staff })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Информация не найдена!'
    })
  }
}