const form = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const recipesDiv = document.getElementById('recipes');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (!query) return;

  recipesDiv.innerHTML = '<p>Loading...</p>';

  try {
    // Fetch recipes from TheMealDB API
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`);
    const data = await res.json();

    if (!data.meals) {
      recipesDiv.innerHTML = '<p>No recipes found. Try another search.</p>';
      return;
    }

    // Clear previous results
    recipesDiv.innerHTML = '';

    data.meals.forEach(meal => {
      const card = document.createElement('div');
      card.className = 'recipe-card';

      card.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <div class="recipe-content">
          <h2 class="recipe-title">${meal.strMeal}</h2>
          <p class="recipe-instructions">${meal.strInstructions.substring(0, 250)}...</p>
        </div>
      `;

      recipesDiv.appendChild(card);
    });
  } catch (error) {
    recipesDiv.innerHTML = `<p>Error fetching recipes. Try again later.</p>`;
    console.error(error);
  }
});
