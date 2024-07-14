import User from '../schema/User.js';
import { sendEmail } from '../services/mailService.js'
import { getWeatherData } from '../services/weatherService.js'
import { getCityName } from '../services/weatherService.js'
import { run } from '../services/geminiService.js'

export const createUser = async (req, res) => {

    const { email, latitude, longitude } = req.body;

    try {
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const newUser = new User({ email, location: { latitude, longitude }, weatherData: [] });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        console.log(user)

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.send(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { email, latitude, longitude } = req.body;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the email is already in use by another user
        if (email && email !== user.email) {
            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
                return res.status(400).json({ message: 'Email already in use' });
            }
        }

        const updatedUser = await User.findByIdAndUpdate(id, { email, location: { latitude, longitude } });
        res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const updateDataAndReport = async (user) => {
    const weatherData = await getWeatherData(user.location.latitude, user.location.longitude);
    const locationName = await getCityName(user.location.latitude, user.location.longitude)
    user.weatherData.push({ date: new Date(), data: weatherData });
    await user.save();

    const prompt = `The weather is currently like this ${JSON.stringify(weatherData)}. Provide me proper understandable description for a user`;

    try {
        const output = await run(prompt);
        const Report = output;
        sendEmail(user.email, 'Weather Report', `You location name :  ${locationName} \n ${Report}`);
        console.log(output);
    } catch (error) {
        console.error("Error:", error);
    }
}


// Function to send weather reports for every user at once
export const sendWeatherReports = async (req, res) => {
    const userIdList = [];
    const users = await User.find({});
    for (const user of users) {
        updateDataAndReport(user);
        userIdList.push(user.email);
    }
    res.status(200).json({ message: "User List (updated & reported) : " + userIdList });
}

// send for a specific user
export const sendWeatherReportsOneUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    updateDataAndReport(user);
    console.log(user);
    res.status(200).json({message: 'User updated successfully'});
}