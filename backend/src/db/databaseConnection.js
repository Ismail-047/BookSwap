import mongoose from "mongoose";

const connectDatabase = async () => {
   try {
      await mongoose.connect(process.env.DATABASE_URI);
      console.log("Database Connected Successfully!");
   } catch (error) {
      console.log("Error Connecting Database" + error);
   }
}

export default connectDatabase;