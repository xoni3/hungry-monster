const getMealDetails = () => {
    let searchInput = document.getElementById("input-box").value;
    let key;
    if(searchInput.length == 1){
        key = "f";
    }
    else{
        key = "s";
    }
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?${key}=${searchInput}`)
    .then((response) => response.json())
    .then((data) => {
    displayFood(data.meals);
    });
};

const displayFood = (foods) => {
    
    let mealContainer = document.getElementById("food-container");
    
    if (foods === null || foods.length < 0) {
        const mealDiv = document.createElement("div");
        const foodInfo = `
            <h3> "No meal found in our inventory. Please search again! "</h3>
        `;

        mealDiv.innerHTML = foodInfo;
        mealContainer.appendChild(mealDiv);

    } 
    
    else {
        foods.forEach((food) => {
           
            const mealDiv = document.createElement("div");
            mealDiv.className = "col-md-4 my-3";
            const foodInfo = `
                    <div onclick="displayFoodDetail('${food.idMeal}')" class="card" style="width: 18rem;">
                        <img  class="card-img-top" src="${food.strMealThumb}" alt="Card image cap">
                        <div class="card-body">
                            <h4 id="meal-name" >${food.strMeal}</h4>
                        </div>
                    </div>
                `;
            mealDiv.innerHTML = foodInfo;
            mealContainer.appendChild(mealDiv);
        });
    }
    document.getElementById("input-box").value = "";
}

const displayFoodDetail = foodDetails => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodDetails}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            foodInfo(data.meals[0]);
        });
}

const foodInfo = food => {
    
    const mealDetail = document.getElementById('food-details');
    const mealIngredients = [];
    for (let i = 1; i <= 20; i++) {
        if (food[`strIngredient${i}`]) {
            mealIngredients.push(`${food[`strMeasure${i}`]}-${food[`strIngredient${i}`]}`);
        } else {
            break;
        }
    }

    mealDetail.innerHTML = `
          <div class="card card-custom">
              <img class="card-img-top" src="${food.strMealThumb}" alt="Card image cap">
              <div class="card-body">
                  <p class="card-text"><h4>${food.strMeal}</h4></p>
                  <h5>Ingredients:</h5>
                  <ul>
                      ${mealIngredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                  </ul>
              </div>
          </div>
           `;
}