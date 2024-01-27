const mongoose = require('mongoose');

const mongoDbConnect = async () => {
  try {
    // console.log('Connecting to MongoDB...');
    // console.log('MongoDB URL:', process.env.MONGO_URL);

    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // console.log('MongoDB Connected Successfully');
  } catch (error) {
    // console.error('Error Connecting to MongoDB Server:', error.message);
    throw error; // Re-throw the error to propagate it further if needed
  }
};

export default mongoDbConnect;
