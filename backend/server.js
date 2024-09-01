const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

mongoose.connect('mongodb://localhost:27017/user12', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const schema1 = new mongoose.Schema({
  firstName: {
    type: String,
    unique: true,
  },
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "model2", // Reference to model2
  },
});

const model1 = mongoose.model("model1", schema1);

const schema2 = new mongoose.Schema({
  lastName: {
    type: String,
    unique: true,
    required: true, 
  },
});

const model2 = mongoose.model("model2", schema2);

app.get("/", async (req, res) => {
  try {
    // Populate the 'id' field which references 'model2'
    const usrfl = await model1.find().populate("id");
    console.log(usrfl);
    res.status(200).json(usrfl); // Send the retrieved data as JSON
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while fetching the data" });
  }
});

app.post("/user1", async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    console.log("firstName:", firstName);
    console.log("lastName:", lastName);

    // Create and save the lastName in model2
    const lastName1 = new model2({ lastName });
    const savedLastName = await lastName1.save();
    console.log(savedLastName);

    const { _id } = savedLastName;

    // Create and save the firstName in model1 with a reference to model2
    const savedFirstName = new model1({ firstName, id: _id });
    const updatedSavedUser = await savedFirstName.save();

    res.status(200).send({ savedLastName, updatedSavedUser });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while saving the user" });
  }
});

app.listen(8000, () => console.log("Server is running on port 8000"));

