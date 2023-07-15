import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors'
import  fs from 'fs';
import path from 'path';

import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostControllers.js';
import * as ReviewsControllers from './controllers/ReviewsControllers.js';
import * as ServicesControllers from './controllers/ServicesControllers.js'
import * as StaffControllers from './controllers/StaffControllers.js'

import { registerValidation, loginValidation, postCreateValidation, reviewCreateValidation, servicesCreateValidation, staffCreateValidation } from './utils/validations.js'
import handleValidationErrors from './utils/handleValidationErrors.js';
import checkAuth from './utils/checkAuth.js';

const PORT = 3000;
const URL = "mongodb://0.0.0.0:27017/humo-legal";

mongoose
  .connect(URL)
  .then(() => console.log('Connect to DB'))
  .catch((err) => console.log((`DB connection error: ${err}`)))

const app = express();
  
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/:me', checkAuth, UserController.getMe);

app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.get('/getAll', PostController.getAll);
app.post('/getCategory', PostController.getByCategory);
app.post('/posts/:id', PostController.getOne);
app.delete('/posts/:id', checkAuth, PostController.remove);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  })
});
app.delete('/delete/:filename', checkAuth, (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join('uploads', filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.json({
      message: 'Файл успешно удален!'
    })
  } else {
    res.status(404).json({
      message: 'Файл не найден!'
    })
  }
})

app.post('/createReview', checkAuth, reviewCreateValidation, handleValidationErrors, ReviewsControllers.create);
app.delete('/removeReview/:id', checkAuth, ReviewsControllers.remove)
app.get('/allReviews', ReviewsControllers.getAll);

app.post('/createService', checkAuth, servicesCreateValidation, handleValidationErrors, ServicesControllers.create);
app.delete('/removeService/:id', checkAuth, ServicesControllers.remove);
app.get('/allServices', ServicesControllers.getAll);
app.post('/oneService/:id', ServicesControllers.getOne);

app.post('/createStaff', checkAuth, staffCreateValidation, handleValidationErrors, StaffControllers.create);
app.delete('/removeStaff/:id', checkAuth, StaffControllers.remove);
app.get('/allStaff', StaffControllers.getAll);
app.post('/oneStaff/:id', StaffControllers.getOne);

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Listening port ${PORT}`);
});