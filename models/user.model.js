const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  imageURL: {
    type: String
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    // This is not necessary because we are using the Role model to validate the role
    // enum: ['USER', 'ADMIN']
  },
  status: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
}, {
  versionKey: false
});

UserSchema.methods.toJSON = function() {
  const user = this;
  console.log(this);
  const userObject = user.toObject();

  delete userObject.password;

  return userObject;

  // const { __v, password, ...restoDePropiedades } = userObject;
  // return restoDePropiedades;
}

module.exports = model('User', UserSchema);