const API_URL = 'http://localhost:3000/api/recipes';

async function getRecipes() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        displayResponse(data);
    } catch (error) {
        displayResponse({ error: error.message });
    }
}

async function getRecipeById(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const data = await response.json();
        displayResponse(data);
    } catch (error) {
        displayResponse({ error: error.message });
    }
}

async function searchRecipes(query) {
    try {
        const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        displayResponse(data);
    } catch (error) {
        displayResponse({ error: error.message });
    }
}

function displayResponse(data) {
    const responseDiv = document.getElementById('response');
    responseDiv.textContent = JSON.stringify(data, null, 2);
    responseDiv.innerHTML = hljs.highlight('json', responseDiv.textContent).value;
}

async function createSampleRecipe() {
    const newRecipe = {
        title: "Паста Карбонара",
        category: "основные блюда",
        ingredients: ["паста", "бекон", "яйца", "пармезан"],
        instructions: "1. Сварить пасту. 2. Обжарить бекон. 3. Смешать с яйцами и сыром.",
        cookingTime: 25,
        difficulty: "средняя"
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRecipe)
        });
        const data = await response.json();
        console.log('Рецепт создан:', data);
    } catch (error) {
        console.error('Ошибка:', error);
    }
}