
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/MaiFocus', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) =>
    console.error('Error connecting to MongoDB:', error)
  );


  const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    cameras: [
      {
        name: String,
        code: String
      }
    ]
  });
  
  const UserModel = mongoose.model('User', userSchema);
// Define the signup route
app.post('/api/signup', (req, res) => {
  // Access the signup data from the request body
  const { name, password, email, phone } = req.body;

  // Save the data to MongoDB
  const signupData = {
    name,
    password,
    email,
    phone,
  };

  // Assuming you have a Mongoose model called `Login` for the 'loginDB' collection
  const Login = require('./models/Login');

  Login.create(signupData)
    .then((data) => {
      console.log('Signup data saved to MongoDB:', data);
      res.status(200).json({ message: 'Signup successful' });
    })
    .catch((error) => {
      console.error('Error saving signup data:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

app.post('/api/login', (req, res) => {
  const { name, password } = req.body;

  // Assuming you have a Mongoose model called `Login` for the 'loginDB' collection
  const Login = require('./models/Login');

  Login.findOne({ name, password })
    .then((loginData) => {
      if (loginData) {
        console.log('Login successful:', loginData);
        res.status(200).json({ message: 'Login successful' });
      } else {
        console.log('Login failed: Invalid name or password');
        res.status(401).json({ error: 'Invalid name or password' });
      }
    })
    .catch((error) => {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});
const { MongoClient } = require('mongodb');
const Login = require('./models/Login');
/*app.get('/api/modelFinder', async (req, res) => {
//  try {
/*async function modelFindermodelFinder(model) {
  // Connection URL
  const url = 'mongodb://localhost:27017/';

  // Create a new MongoClient
  const client = new MongoClient(url, { useUnifiedTopology: true });
  try {
    // Connect to the MongoDB server
    await client.connect();

    // Access the database
    const db = client.db('MaiFocus');

    // Access the collection
    const collection = db.collection('AIModelObject');

    // Find all documents in the collection
    const documents = await collection.find().toArray();
    //const documents = await collection.find({}, { name: 1 });

    for (const document of documents) {
     // console.log(document['AIModelObject']);
      const aiModelObjects = documents.map((document) => document.AIModelObject);
     res.json(aiModelObjects );
      //res.json(document['AIModelObject']);
      console.log(aiModelObjects);
    }

    //return String(aiModelObjects);
    
  } finally {
    // Close the connection
    client.close();
  }
});*/


// Define the schema for the message
const ModelSchema = new mongoose.Schema({
  name: [String],
});

const Model = mongoose.model('options', ModelSchema);

app.get('/api/AIModelObject', async (req, res) => {
  try {
    const Models = await Model.find({}, { name: 1 });
    res.json(Models);
    //onsole.log(Models);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'An error occurred while fetching messages' });
  }
});





// Define the schema for the message
const messageSchema = new mongoose.Schema({
  name: String,
});

const Message = mongoose.model('message', messageSchema);

app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.find({}, { name: 1 });
    res.json(messages);
    //console.log(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'An error occurred while fetching messages' });
  }
});
// Define the add camera route
const addcameraSchema = new mongoose.Schema({
  username:String,
  name: String,
  code: String,
  source: String,
});

// Create the model for the add camera
//const AddCamera = mongoose.model('AddCamera', addcameraSchema);
app.post('/api/addCamera', async (req, res) => {
  const { name, cameraName, cameraCode } = req.body;
  try {
    const user = await Login.findOne({ name });
    if (user) {
      user.cameras.push({ name: cameraName, code: cameraCode });
      await user.save();
      console.log({ name: cameraName, code: cameraCode })
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error adding camera to user:', error);
    res.sendStatus(500);
  }
});

/*app.post('/api/add-camera', (req, res) => {
  // Access the add camera data from the request body
  const { username,name, code, source } = req.body;

  // Save the data to MongoDB
  const addCameraData = {
    username,
    name,
    code,
    source,
  };

// Create the model for the add camera
const AddCamera = mongoose.model('AddCamera', addcameraSchema);
  AddCamera.create(addCameraData)
    .then((data) => {
      console.log('Camera data saved to MongoDB:', data);
      res.status(200).json({ message: 'Camera added successfully' });
    })
    .catch((error) => {
      console.error('Error saving camera data:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});*/


const usersettingsSchema = new mongoose.Schema({
  name: String,
  sourcelink: String,
  model: String,
  message: String,
});

// Create the model for the usersettings
const Usersettings = mongoose.model('Usersettings', usersettingsSchema);


app.post('/api/usersettings', (req, res) => {
 
  const { name, sourcelink, model, message } = req.body;

  // Save the data to MongoDB
  const usersettings = {
    name,
    sourcelink,
    model,
    message,
  };
  const Usersettings = mongoose.model('Usersetting', usersettingsSchema);
  Usersettings.create(usersettings)
    .then((data) => {
      console.log('Camera data saved to MongoDB:', data);
      res.status(200).json({ message: 'Camera added successfully' });
    })
    .catch((error) => {
      console.error('Error saving camera data:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Multer middleware for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upfiles'); // Set the desired file destination folder
  },
  /*filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Set the file name
  },*/
  filename: function (req, file, cb) {
    const fileName = Date.now() + path.extname(file.originalname);
    cb(null, fileName); // Set the file name as current timestamp + file extension
  },
});

const upload = multer({ storage: storage });

// POST endpoint for file upload
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const fileUrl = `http://localhost:4000/uploads/${req.file.filename}`; // Construct the file URL based on the upload folder and file name
    // Save the file link to MongoDB using Mongoose or your preferred method
    // ...
    res.json({ link: fileUrl });
    console.log('File URL:', fileUrl);
    const newLink = new Link({ link: fileUrl });

    // Save the link to MongoDB
    await newLink.save();
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Error uploading file' });
  }
});
// Define a schema for the file links
const linkSchema = new mongoose.Schema({
  link: String,
});

// Create a model based on the schema
const Link = mongoose.model('Link', linkSchema);


app.post('/api/detect', async (req, res) => {
  const { model, rtmp } = req.body;


  try {
    const response = await axios.post('http://localhost:5000/maifocus/detect/', {
      model,
      rtmp
    }, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error during detection:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Fetch user cameras
app.get('/api/usercameras', (req, res) => {
  // Retrieve the logged-in user's username from the request
  const { username } = req.query;

  // Query the database to retrieve the user's cameras
  Login.findOne({ username })
    .then((user) => {
      if (user) {
        // Return the cameras array from the user document
        console.log(user.cameras)
        res.status(200).json(user.cameras);
      } else {
        // User not found
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch((error) => {
      console.error('Error fetching user cameras:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});


// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



