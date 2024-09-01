// const express = require("express"); 
// const mongoose = require("mongoose");
// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// mongoose.connect('mongodb://localhost:27017/user12')
//     .then(() => console.log('db is connected'))
//     .catch(err => console.log(err));

// const userSchema = new mongoose.Schema({
//     name: { type: String, unique: true }
// });

// const userModel = mongoose.model('user', userSchema);

// //userModel.createIndexes(); // Ensure indexes are created

// app.get('/', async (req, res) => {
//     const { name } = req.body;
//     try {
//         const savedUser = await userModel.find();
//         console.log('saved user', savedUser);
//         res.status(200).send(savedUser);
//     } catch (error) {
//         if (error.code === 11000) { 
//             res.status(400).send({ message: 'Name already exists' });
//         } else {
//             res.status(500).send(error);
//         }
//     }
// });

// app.post('/', async (req, res) => {
//     const { name } = req.body;

//     try {
//         const isExisted = userModel.findOne({name})
//         if(isExisted){
//            return res.send('user is existed')
//         } 
//         const savedUser = await userModel.create({ name });
//         console.log('saved user', savedUser);
//         return  res.status(200).send(savedUser);
//     } catch (error) {
//         if (error.code === 11000) { 
//             res.status(400).send({ message: 'Name already exists' });
//         } else {
//             res.status(500).send(error);
//         }
//     }
// });

// app.put('/', async (req, res) => {
//     const { name } = req.body;
//     try {
// test 2 for the git 
//         const savedUser = await userModel.findOne({ name}, { name:"rano" }, { new: true, runValidators: true });
//         console.log('saved user', savedUser);
//         res.status(200).send(savedUser);
//     } catch (error) {
//         if (error.code === 11000) { 
//             res.status(400).send({ message: 'Name already exists' });
//         } else {
//             res.status(500).send(error);
//         }
//     }
// });

// app.delete('/', async (req, res) => {
//     const { name } = req.body;
//     try {
//         const savedUser = await userModel.findOneAndDelete({ name}, { name:"rano" }, { new: true, runValidators: true });
//         console.log('saved user', savedUser);
//         res.status(200).send(savedUser);
//     } catch (error) {
//         if (error.code === 11000) { 
//             res.status(400).send({ message: 'Name already exists' });
//         } else {
//             res.status(500).send(error);
//         }
//     }
// });




// app.listen(8000, () => console.log('server is running on port 8000'));



const express = require('express');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.json());

app.post('/user', [
  // Validation rules
  body('username').isLength({ min: 5 }).withMessage('Username must be at least 5 characters long'),
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
], (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  // If no errors, proceed with user creation  test again 
  
  res.send('User created successfully!');
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});

