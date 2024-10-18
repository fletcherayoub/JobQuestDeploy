import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URL, {
        dbName: "jobquest",
    })
    .then(() => {
        console.log("Database connected!");
    })
    .catch((err) => {
        console.log(`Error connecting to database: , ${err}`);
    });
};




