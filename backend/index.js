const express = require("express");
const cors = require("cors");
const  mongoose = require("mongoose");
require('dotenv').config();
const User = require('./Models/Users.js');
const Place=require('./models/Place.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');

const app = express();

const bcryptSalt = bcrypt.genSaltSync(7);
const jwtSecret = 'safwewrq343trrdfq3';
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads/', express.static(__dirname + '/uploads/'));
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


app.post('/login', async (req, res) => {   
    const { email, password } = req.body;
    console.log(req.body);

    const userDoc = await User.findOne({ email });
    if (userDoc) {
        const isMatch = bcrypt.compareSync(password, userDoc.password);
        if (isMatch) {
            jwt.sign({ email: userDoc.email, id: userDoc._id, name: userDoc.name }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                // Send the token in the response cookie
                res.cookie('token', token, { httpOnly: true }).json('pass ok');
            });
        } else {
            console.log("not found");
            res.status(422).json('Wrong Password');
        }
    } else {
        console.log('no');
        res.status(404).json('not found');
    }
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, user) => {
            if (err) throw err;
            res.json(user); 
            console.log(user);
            const userDoc = await User.findById(user._id);
            
        });
    } else {
        res.json(null); 
    }
});

app.post('/logout',(req,res)=>{
    res.cookie('token','').json(true);
})


app.post('/upload-by-link',async (req,res)=>{
    const {link} = req.body;
    const newName='photo'+ Date.now()+'.jpg';
   await  imageDownloader.image({
        url:link,
        dest: __dirname +'/uploads/'+newName,
    });
    res.json(__dirname +'/uploads/'+newName);
})


const photosMiddleware = multer({ dest: 'upload/' });

app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];
    
    try {
        for (let i = 0; i < req.files.length; i++) {
            const { path: tempPath, originalname } = req.files[i];
            const parts = originalname.split('.');
            const ext = parts[parts.length - 1];
            const newPath = `${tempPath}.${ext}`;
            
            // Rename the temporary file to include its original extension
            fs.renameSync(tempPath, newPath);
            
            // Push the new path, removing the `upload` prefix
            uploadedFiles.push(newPath.replace('upload/', ''));
        }
        
        res.json(uploadedFiles);
    } catch (error) {
        console.error("Error processing files:", error.message);
        res.status(500).json({ error: "File upload failed" });
    }
});



app.post('/places', (req,res)=>
{
    const {token}=req.cookies;
    const {title,address,addedPhotos,description,perks,extraInfo,checkIn,checkOut,maxGuests}=req.body
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
        if (err) throw err;
        const placeDoc=await Place.create({
            owner:userData.id,title,address,addedPhotos,description,perks,extraInfo,checkIn,checkOut,maxGuests
        }) 
        res.json(placeDoc);   
    });
    
})
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});