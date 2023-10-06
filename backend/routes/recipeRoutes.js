import express from 'express'
import { getRecipes, postRecipe, updateRecipe, deleteRecipe } from '../controllers/recipeController.js'
import protect from '../middleware/authMiddleware.js'

const recipeRoutes = express.Router();

recipeRoutes.get('/', protect, getRecipes)
recipeRoutes.post('/', protect, postRecipe)
recipeRoutes.put('/:id', protect, updateRecipe)
recipeRoutes.delete('/:id', protect, deleteRecipe)

export default recipeRoutes