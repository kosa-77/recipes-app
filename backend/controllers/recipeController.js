import Recipe from '../models/Recipe.js'

const getRecipes = async (req,res) => {
    try {
        //req.user is first set in function protect authMiddleware, if postRecipe route is not protected
        //it will throw TypeError: cannot read property 'id' of undefined

        //return only recipes of the user who sent the request
        const recipes = await Recipe.find({user: req.user});
        if(recipes) {
            res.status(200).json(recipes);
        }
    } catch(e) {
        console.log(e)
        res.status(404).send('Error 404, Not Found')
    }
}

const postRecipe = async (req,res) => {
    try {
        if(!req.body.name || !req.body.ingredients || !req.body.instructions){
            res.status(400)
            throw new Error('Please add all required fields')
        }
        //req.user is first set in function protect authMiddleware, if postRecipe route is not protected
        //it will throw TypeError: cannot read property 'id' of undefined
            const recipe = await Recipe.create({
                user: req.user.id,
                name: req.body.name,
                ingredients: req.body.ingredients,
                instructions: req.body.instructions
            })
            res.status(201).json(recipe);
    } catch (e) {
        console.log(e)
    }
}

const updateRecipe = async (req,res) => {
    try {
        const toBeUpdated = await Recipe.findById(req.params.id)
        const { name, ingredients, instructions } = req.body
        
        //req.user is first set in function protect authMiddleware, if postRecipe route is not protected
        //it will throw TypeError: cannot read property 'id' of undefined
        if(toBeUpdated.user.toString() !== req.user.id) {
            throw new Error("Id's don't match")
        }

        if (!name || !ingredients || !instructions){
            throw new Error("Fields can't be empty")
        }
        if(toBeUpdated){
            toBeUpdated.name = name,
            toBeUpdated.ingredients = ingredients,
            toBeUpdated.instructions = instructions
            toBeUpdated.save()
            res.status(201).send(toBeUpdated)
        } else {
            res.status(404).send('recipe not found')
        }
    } catch(e) {
        console.log(e)
    }
}

const deleteRecipe = async (req,res) => {
    try {
        const toDelete = await Recipe.findById(req.params.id)
        
        if(!toDelete){
            throw new Error('recipe not found')
        }

        //req.user is first set in function protect authMiddleware, if postRecipe route is not protected
        //it will throw TypeError: cannot read property 'id' of undefined
        if(toDelete.user.toString() !== req.user.id){
            throw new Error("id's don't match")
        }

        const deleted = await Recipe.deleteOne({user: toDelete.user})
        if(deleted) {
            res.status(410).send({deleted});
        }
    } catch(e) {
        console.log(e)
        throw new Error('could not delete recipe')
    }
}

export {
    getRecipes,
    postRecipe,
    updateRecipe,
    deleteRecipe
}