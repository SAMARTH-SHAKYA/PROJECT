const express = require("express");
const cors = require("cors");
const  mongoose = require("mongoose");
require('dotenv').config();
const User = require('./Models/Users.js');
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

// app.use('/uploads', (req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//     next();
// }, express.static(__dirname + '/uploads'));

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

// app.post('/login',async (req,res)=>{
//     const {email,password} = req.body;
//     console.log(req.body);
    
//     const userDoc = await User.findOne({email});
//     if(userDoc){
//         // res.json('found');
//         const isMatch = bcrypt.compareSync(password,userDoc.password);
//         if(isMatch){
//             // console.log('isMatch');
//             jwt.sign({email:userDoc.email, id: userDoc._id, name: userDoc.name},jwtSecret,{},(err,token)=>{
//                 if(err) throw err;
//                 // console.log(token);
//                 res.cookie('token',token).json('pass ok');
//             });
//             return res.cookie('token','').json('Ok');
//         }
//         else{
//             console.log("not found");
//            return res.status(422).json('Wrong Password');
//         }
//     }else{
//         console.log('no');
//        return res.status(404).json('not found');
       
       
//     }
// });
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

// app.get('/profile',(req,res)=>{
//     const {token} = req.cookies;
//     if(token){
//         jwt.verify(token, jwtSecret, {}, (err,user)=>{
//             if(err) throw err;
//             res.json(user);
//         })
//     }else{
//         res.json(null);
//     }
//     res.json({token});

// })

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, user) => {
            if (err) throw err;
            res.json(user); // Send user data if the token is valid
            console.log(user);
            const userDoc = await User.findById(user._id);
            
        });
    } else {
        res.json(null); // No token, respond with null
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

const photosMiddleware  = multer({dest:'upload/'});
app.post('/upload',photosMiddleware.array('photos',100),(req,res)=>{
    const uploadFiles = [];
    for(let i = 0;i<req.files.length;i++){
        const {path,originalname} = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length-1];
        const newPath = path + '.' + ext;
        fs.readFileSync(path,newPath);
        uploadedFiles.push(newPath.replace('/upload'));
    }
    req.json(uploadFiles);
})

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});