import mongoose from 'mongoose'

const recipeSchema = mongoose.Schema({
    user: { 
        type : mongoose.Schema.Types.ObjectId,
        required: true, 
        ref: 'User'
    },
    name: {
        type:String,
        required:true,
    },
    ingredients: {
        type:String,
        required:true
    },
    instructions: {
        type:String,
        required:true
    }
}, {
    timestamps: true
})

const Recipe = mongoose.model('Recipe', recipeSchema)
export default Recipe