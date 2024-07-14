import express from 'express'
import { connectDB } from './config/DBConnect.js'
import {sendWeatherReports} from './controllers/user.controller.js'
import { config } from 'dotenv'
import userRouter from './routes/user.routes.js'
import cors from 'cors';
import cron from 'node-cron';

config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const PORT = process.env.PORT || 5000;

app.use('/user', userRouter)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is up and running at port ${PORT}`);
    })
})

//scheduled email sending
cron.schedule('0 */3 * * *', () => {
    // Fetch weather data and send email for every users on database
    sendWeatherReports();
});