import mongoose from 'mongoose'

export const connectDB = async () => {

    const uri = process.env.MONGO_URI || '';

    if (!uri) {
        throw new Error("Mongo uri is missing !!!");
    }

    try {
        await mongoose.connect(uri);
        console.log("Connected to Database !")
    } catch (err) {
        console.error("Error connecting MongoDB : ", err)
    }


}