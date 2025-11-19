import mongoose from 'mongoose'

export const connectDB = async (): Promise<void> => {
    try {
        const mongoURI = process.env['MONGODB_URI'];
        if (!mongoURI) {
            throw new Error('MONGODB_URL is not defined')
        }
        await mongoose.connect(mongoURI)
        process.on('SIGINT', async () => {
            await mongoose.connection.close()
            process.exit(0)
        })
        console.log('Connected to MongoDB')
    } catch (error) {
        throw new Error(`Error connecting to mongoDb ${error}`)
    }
}

export const disconnectDB = async (): Promise<void> => {
    try {
        await mongoose.connection.close()
    } catch (error) {
        throw new Error(`Error connecting to mongoDb ${error}`)
    }
}