const openMenuBtn = document.querySelector(".open-menu-btn");
const closeMenuBtn = document.querySelector(".close-menu-btn");
const menuForSm = document.querySelector(".nav-for-sm");

openMenuBtn.addEventListener("click", () => {
  openMenuBtn.classList.remove("max-sm:block");
  closeMenuBtn.classList.remove("hidden");
  menuForSm.classList.remove("hidden");
  console.log("Tony");
});
closeMenuBtn.addEventListener("click", () => {
  openMenuBtn.classList.add("max-sm:block");
  closeMenuBtn.classList.add("hidden");
  menuForSm.classList.add("hidden");
});

// RECIPE APIS
const recipeContainer = document.querySelector(".recipe-c");
const recipeImg = document.querySelector(".recipe img");
const recipeName = document.querySelector(".recipe-name");

// Fetch meal by category
const mealsByCategories = async () => {
  let apiSource = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  const apiJson = await apiSource.json();

  console.log(apiJson);

  return apiJson.categories;
};

const displayMeals = (categories) => {
  const mealImg = categories.strCategoryThumb;
  const mealName = categories.strCategory;

  let mealEl = document.createElement("li");

  mealEl.innerHTML = `
  <li class="recipe border w-[23rem] h-64 rounded-xl overflow-hidden relative">
    <img class="object-cover w-full" src="${mealImg}" alt="${mealName}">
    <div class="flex justify-between items-center absolute bottom-0 left-0 right-0 py-1.5 px-4 bg-gray-100/60">
        <span class="recipe-name text-black text-lg font-medium">${mealName}</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.5" stroke="currentColor" class="star-btn w-6 h-6 cursor-pointer">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          </svg>   
    </div>
</li>
    `;
  recipeContainer.append(mealEl);

  const btn = mealEl.querySelector('.recipe div .star-btn')

  btn.addEventListener('click', () => {
    if(btn.classList.contains('fill-orange-500')){
      btn.classList.remove('fill-orange-500')
    }else{
      btn.classList.add('fill-orange-500')
    }
    
  })

};

const displayMealsByCategories = async () => {
  const mealsArray = await mealsByCategories();

  for (const meal of mealsArray) {
   displayMeals(meal);
  }
};


const searchMealByName = async (name) => {
  const fetchMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
  const mealsJson = await fetchMeals.json()
  console.log(mealsJson)
  const mealArray = mealsJson.meals;

  if(mealArray){
    recipeContainer.innerHTML = '';

    for(const meal of mealArray){
      const mealEl = document.createElement('li')
      mealEl.innerHTML = `
      <li class="recipe border w-[23rem] h-64 rounded-xl overflow-hidden relative">
      <img class="object-cover w-full" src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <div class="flex justify-between items-center absolute bottom-0 left-0 right-0 py-1.5 px-4 bg-gray-100/60">
          <span class="recipe-name text-black text-lg font-medium">${meal.strMeal}</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.5" stroke="currentColor" class="star-btn w-6 h-6 cursor-pointer">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>   
      </div>
  </li>
      `
      recipeContainer.append(mealEl)
    }
  }else{
    recipeContainer.innerHTML = "<p>Not found</p>"
  }
}

const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click',  ()=>{
  const searchInput = document.getElementById('search-input').value.trim();

  if(searchInput !== ''){
   
    searchMealByName(searchInput)
  }
})
displayMealsByCategories();
