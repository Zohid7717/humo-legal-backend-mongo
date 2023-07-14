import ServicesModel from '../models/Services.js'

export const create = async (req, res) => {
  try {
    const doc = new ServicesModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
    });
    const services = await doc.save();
    res.json(services);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось создать услугу!',
    });
  }
}

export const remove = async (req, res) => {
  try {
    const serviceId = req.params.id;
    ServicesModel.findByIdAndDelete({ _id: serviceId })
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: 'Услуга не найдена!',
          });
        }
        return res.json({
          success: true,
        })
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить услугу!'
    })
  }
}

export const getAll = async (req, res) => {
  try {
    const services = await ServicesModel.find();
    res.json(services);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить услуги!'
    })
  }
}

export const getOne = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const service = await ServicesModel.findById(serviceId);
    res.json({service})
  } catch (error) {
    console.log(service);
    res.status(400).json({
      message: 'Услуга не найдена!'
    })
  }
}