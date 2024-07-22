import mongoose from "mongoose";

const connectToDB = async () => {
    const url = 'mongodb://localhost:27017/user-managment';

    mongoose
        .connect(url)
        .then(() => console.log('Database connection is successful'))
        .catch((error) => console.error(error))
}

export default connectToDB;