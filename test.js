//connect to mongodb using  mongoose
const mongoose = require("mongoose");

//this connect to database name testing running at port 27017 at localhost

const connect = () => {
  return mongoose.connect("mongodb://localhost:27017/testing");
};

//creating schema
const student = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  favFoods: [{ type: String }],

  school: {
    type: mongoose.Schema.Types.ObjectId,
    // crequired:true,
    ref: "school", //refer to model
  },
});

//nested schema

const school = new mongoose.Schema({
  name: String,
});

const School = mongoose.model("school", school);

const Student = mongoose.model("student", student);

connect().then(async (connection) => {
  const school1 = await School.create({ name: "Campion" });

  const student1 = await Student.create({
    firstName: "john",
    favFoods: ["pizza", "burger", "paste", "paneer-tikka"],
    school: school1._id,
    
  });
  // .populate replaces the field value with other documents from other collection(s)

  const match = await Student.findById(student1.id).populate("school").exec();
  console.log(match);
  console.log(student1)
  console.log(school1)

  //find document

  // const student2 = await Student.find({name:"abc"});
  // const student3 = await Student.findById('12jsl')
  // const student4  = await Student.findByIdAndDelete({})
  // const student5 = await Student.findByIdAndUpdate('',{})
})