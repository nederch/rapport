
const mongoose=require('mongoose')


const NotesSchema=mongoose.Schema({
    valeur:Number,
    evaluation:String,
    coursId:{type:mongoose.Schema.Types.ObjectId , ref:"Cour"},
    studentId:{type:mongoose.Schema.Types.ObjectId , ref:"User"},
    
})

const note = mongoose.model('Note',NotesSchema)

module.exports=note