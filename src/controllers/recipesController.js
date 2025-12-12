const recipesController = {
  getAllRecipes(req, res, recipes) {
    try {
      const { category, difficulty, maxTime } = req.query;
      let filteredRecipes = [...recipes];

      if (category) {
        filteredRecipes = filteredRecipes.filter(recipe => 
          recipe.category.toLowerCase() === category.toLowerCase()
        );
      }

      if (difficulty) {
        filteredRecipes = filteredRecipes.filter(recipe => 
          recipe.difficulty.toLowerCase() === difficulty.toLowerCase()
        );
      }

      if (maxTime) {
        filteredRecipes = filteredRecipes.filter(recipe => 
          recipe.cookingTime <= parseInt(maxTime)
        );
      }

      res.json({
        success: true,
        count: filteredRecipes.length,
        data: filteredRecipes
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getRecipeById(req, res, recipes) {
    try {
      const { id } = req.params;
      const recipe = recipes.find(r => r.id === parseInt(id));

      if (!recipe) {
        return res.status(404).json({ 
          success: false, 
          error: 'Рецепт не найден' 
        });
      }

      res.json({
        success: true,
        data: recipe
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  searchRecipes(req, res, recipes) {
    try {
      const { q } = req.query;
      
      if (!q) {
        return res.status(400).json({ 
          success: false, 
          error: 'Не указан поисковый запрос' 
        });
      }

      const searchResults = recipes.filter(recipe => 
        recipe.title.toLowerCase().includes(q.toLowerCase()) ||
        recipe.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(q.toLowerCase())
        )
      );

      res.json({
        success: true,
        count: searchResults.length,
        data: searchResults
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  createRecipe(req, res, recipes) {
    try {
      const { title, category, ingredients, instructions, cookingTime, difficulty } = req.body;

      if (!title || !category || !ingredients || !instructions) {
        return res.status(400).json({ 
          success: false, 
          error: 'Заполните все обязательные поля' 
        });
      }

      const newRecipe = {
        id: recipes.length > 0 ? Math.max(...recipes.map(r => r.id)) + 1 : 1,
        title,
        category,
        ingredients: Array.isArray(ingredients) ? ingredients : [ingredients],
        instructions,
        cookingTime: cookingTime || 30,
        difficulty: difficulty || 'средняя',
        createdAt: new Date().toISOString()
      };

      recipes.push(newRecipe);

      res.status(201).json({
        success: true,
        message: 'Рецепт успешно создан',
        data: newRecipe
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
  updateRecipe(req, res, recipes) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const recipeIndex = recipes.findIndex(r => r.id === parseInt(id));

      if (recipeIndex === -1) {
        return res.status(404).json({ 
          success: false, 
          error: 'Рецепт не найден' 
        });
      }

      recipes[recipeIndex] = {
        ...recipes[recipeIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };

      res.json({
        success: true,
        message: 'Рецепт успешно обновлен',
        data: recipes[recipeIndex]
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  deleteRecipe(req, res, recipes) {
    try {
      const { id } = req.params;
      const recipeIndex = recipes.findIndex(r => r.id === parseInt(id));

      if (recipeIndex === -1) {
        return res.status(404).json({ 
          success: false, 
          error: 'Рецепт не найден' 
        });
      }

      const deletedRecipe = recipes.splice(recipeIndex, 1);

      res.json({
        success: true,
        message: 'Рецепт успешно удален',
        data: deletedRecipe[0]
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

module.exports = recipesController;