import express from 'express';
import { createUser, getUser, getAllUsers, updateUser, deleteUser, sendWeatherReports, sendWeatherReportsOneUser } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.post('/create', createUser);
userRouter.get('/get/:id', getUser);
userRouter.put('/update/:id', updateUser);
userRouter.delete('/delete/:id', deleteUser);
userRouter.put('/weather', sendWeatherReports);
userRouter.put('/weather/:id', sendWeatherReportsOneUser);

export default userRouter;