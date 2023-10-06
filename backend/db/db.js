import mongoose from 'mongoose'

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 5000,
    socketTimeoutMS: 20000,
    heartbeatFrequencyMS: 10000,
    retryWrites: true,
};

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, options);
        console.log(`Mongodb connected on port: ${conn.connection.host}`)
    } catch (err) {
        console.log(err)
        process.exit(1);
    }
}

export default connectDB;