
const mongoose=require('mongoose')


const CoursSchema=mongoose.Schema({
    name:String,
    description:String,
    dateD:Date,
    dateF:Date,
    duree:Number,
    teacherId:{type:mongoose.Schema.Types.ObjectId , ref:"User"},
    students:[{type:mongoose.Schema.Types.ObjectId , ref:"User"}],
    notes:[{type:mongoose.Schema.Types.ObjectId , ref:"Note"}]
   
    
    
})

const cour = mongoose.model('Cour',CoursSchema)

module.exports=cour