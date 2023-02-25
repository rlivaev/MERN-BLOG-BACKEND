import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
mongoose.set("strictQuery", true);

import {registerValidation,loginValidation, postCreateValidation} from './validations.js';

import {checkAuth,handleValidationErrors} from './utils/index.js';

import {UserControllers,PostControllers} from './controllers/index.js'




mongoose
.connect('mongodb+srv://admin:admin@cluster0.p6xrh5f.mongodb.net/blog?retryWrites=true&w=majority')
.then(()=>console.log("DB connected"))
.catch((err)=>console.log(err))


const app = express();// создал эксперсс преложение 
const storage = multer.diskStorage({
    destination:(_,__,cb)=>{
        cb(null,'uploads');
    },
        filename:(_,file,cb)=>{
            cb(null,file.originalname);
    }
});

const upload = multer({storage});

app.use(express.json());

app.use('/uploads',express.static('uploads'));

app.post('/auth/login',loginValidation,handleValidationErrors,UserControllers.login);
app.post('/auth/registration',registerValidation,handleValidationErrors,UserControllers.register);
app.get('/auth/me',checkAuth,UserControllers.getMe)

app.post('/upload',checkAuth,upload.single('image'),(req,res)=>{
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

app.get('/posts',PostControllers.getAll);
app.get('/posts/:id',PostControllers.getOne);
app.post('/posts',checkAuth,postCreateValidation,handleValidationErrors,PostControllers.create);
app.delete('/posts/:id',checkAuth,PostControllers.remove);
app.patch('/posts/:id',checkAuth,postCreateValidation,handleValidationErrors,PostControllers.update);


app.listen(3000,(err)=>{
if(err){
    return console(err)
}
console.log("Server OK!")
});