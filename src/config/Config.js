import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Denna funktion renderar ut rätt databs URL baserat på vilken miljö vi är i.

const connectToDB = async () => {
  const DB_URL = process.env.DATABASE_URL;
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
    });
    console.log('Successfully connected to MongoDB.');
  } catch (err) {
    console.error(err);
    process.exit();
  }
};

const connectToPort = (app) => {
  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

export default { connectToDB, connectToPort };
