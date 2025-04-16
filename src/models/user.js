import mongoose, {model} from 'mongoose';

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    confirmPassword: String,
    name: String,
    lastName: String,
  });
  
  export default model("User", userSchema);