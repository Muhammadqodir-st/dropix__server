const mongoose = require('mongoose');

const connectDB = async () => {
    const conn = mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('connected mongodb'))
        .catch((err) => console.error(err));
}

module.exports = connectDB;