const mongoose=require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema=mongoose.Schema({
    firstName:String,
    lastName:String,
    email: { type: String,  unique: true, required: true },
    tel:{ type: String,  unique: true, required: true },
    telFils:String,
    adress:String,
    speciality:String,
    image:String,
    fichier:String,
    password:String,
    role: { type: String, enum: ['admin', 'teacher', 'student', 'parent'], required: true },
    status:Boolean
},{strict:false})


UserSchema.plugin(uniqueValidator);

const user = mongoose.model('User',UserSchema)

module.exports=user