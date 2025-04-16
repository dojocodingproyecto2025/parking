import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  var data = req.body;

  var passwordEncryptado = await bcrypt.hash(data.password, 10);

  //aes-256 este es otro de dos vias
  var newUser = new User({
    email: data.email,
    password: passwordEncryptado,
    name: data.name,
    lastName: data.lastName,
  });
  await newUser.save();
  res.status(201).json({ status: true });
};
const login = async (req, res) => {
  var data = req.body;
  console.log(data);

  var userFind = await User.findOne({ email: data.email });
  console.log(userFind);
  if (userFind == null) {
    return res.status(201).json({ exist: false });
  }
  var validate = await bcrypt.compare(data.password, userFind.password);
  if (!validate) {
    return res.status(201).json({ exist: false });
  }

  var userData = {
    userId: userFind._id,
    email: userFind.email,
    name: userFind.name,
    lastName: userFind.lastName,
  };

  var jwtValue = jwt.sign(userData, "dojoFiKey", { expiresIn: "1m" });

  res.status(201).json({ exist: true, jwt: jwtValue });
};

export default { register, login };
