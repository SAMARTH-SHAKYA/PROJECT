const express = require("express");
const cors = require("cors");
const  mongoose = require("mongoose");
require('dotenv').config();
const User = require('./Models/Users.js');
const bcrypt = require('bcryptjs')

const app = express();

const bcryptSalt = bcrypt.genSaltSync(7);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
}));


mongoose.connect(process.env.MONGO_URL);

app.get('/test',(req,res)=>{

    res.json('Hello World');
});

app.post('/register', async (req,res)=>{
    const {name,email,password} = req.body;
    console.log(req.body);
    
  try {
    const userDoc =  await User.create({
        name,email,password:bcrypt.hashSync(password, bcryptSalt),
    });

    res.json(userDoc);

  } catch (error) {
    res.status(422).json(error);
  }

})

app.post('/login',async (req,res)=>{
    const {email,password} = req.body;
    console.log(req.body);
    
    const userDoc = await User.findOne({email});
    if(userDoc){
        // res.json('found');
        const isMatch = bcrypt.compareSync(password,userDoc.password);
        if(isMatch){
            console.log('isMatch');
            return res.json('Ok');
        }
        else{
            console.log("not found");
           return res.status(422).json('Wrong Password');
        }
    }else{
        console.log('no');
       return res.status(404).json('not found');
       
       
    }
})
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});