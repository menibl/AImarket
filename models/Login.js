const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  cameras: [
    {
      name: String,
      code: String
    }
  ]
});

const Login = mongoose.model('Login', loginSchema);

module.exports = Login;
