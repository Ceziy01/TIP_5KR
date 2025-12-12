const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipesController');

let recipes = [
  {
    id: 1,
    title: "Борщ",
    category: "супы",
    ingredients: ["свекла", "капуста", "картофель", "морковь"],
    instructions: "Варить овощи 1 час",
    cookingTime: 60,
    difficulty: "средняя"
  },
  {
    id: 2,
    title: "Оливье",
    category: "салаты",
    ingredients: ["картофель", "колбаса", "огурцы", "горошек"],
    instructions: "Нарезать и смешать все ингредиенты",
    cookingTime: 30,
    difficulty: "легкая"
  }
];

router.get('/', (req, res) => recipesController.getAllRecipes(req, res, recipes));
router.get('/:id', (req, res) => recipesController.getRecipeById(req, res, recipes));
router.get('/search', (req, res) => recipesController.searchRecipes(req, res, recipes));
router.post('/', (req, res) => recipesController.createRecipe(req, res, recipes));
router.put('/:id', (req, res) => recipesController.updateRecipe(req, res, recipes));
router.delete('/:id', (req, res) => recipesController.deleteRecipe(req, res, recipes));

module.exports = router;