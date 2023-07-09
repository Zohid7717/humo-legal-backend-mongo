import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostControllers.js';
import { registerValidation, loginValidation, postCreateValidation } from './utils/validations.js'
import handleValidationErrors from './utils/handleValidationErrors.js';
import checkAuth from './utils/checkAuth.js';
import cors from 'cors'

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

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Listening port ${PORT}`);
});