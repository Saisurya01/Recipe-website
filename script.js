document.getElementById("searchbutton").addEventListener("click", searchrecipes);

function searchrecipes() {
    const searchterm= document.getElementById("searchinput").value.trim();

    if(searchterm !== ""){

        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchterm}`)
        .then(response => response.json())
        .then(data => {
            diplayrecipes(data.meals);
        })
       .catch (error => console.error("Error fetching data:", error));

    } else{
        clearresult();
    }

    function diplayrecipes(recipes) {
        const resultlist = document.getElementById("result");
        resultlist.innerHTML = ""; 
        if(recipes){
            recipes.forEach(recipe => {
                const li=document.createElement("li");
                li.classList.add("recipe");

                const img=document.createElement("img");
                img.src = recipe.strMealThumb;
                img.alt = recipe.strMeal;

                const title=document.createElement("h3");
                title.textContent = recipe.strMeal;

                const recipedetails=document.createElement("p");
                recipedetails.textContent = recipe.strInstructions;

                const recipeingredients = document.createElement("ul");
                for (let i = 1; i <= 20; i++) {
                    const ingredient = recipe[`strIngredient${i}`];
                    const measure = recipe[`strMeasure${i}`];
                    if (ingredient) {
                        const ingredientItem = document.createElement("li");
                        ingredientItem.textContent = `${measure} ${ingredient}`;
                        recipeingredients.appendChild(ingredientItem);
                    }
                }
                const ingredientsTitle = document.createElement("h4");
                ingredientsTitle.textContent = "Ingredients:";

                li.appendChild(img);
                li.appendChild(title);
                li.appendChild(recipedetails);
                resultlist.appendChild(li);
                li.appendChild(ingredientsTitle);
                li.appendChild(recipeingredients);
            })
        }
        else {
            const li = document.createElement("li");
            li.textContent = "No recipes found.";
            resultlist.appendChild(li);
        }
    }


function clearresult() {
    const resultlist = document.getElementById("result");
    resultlist.innerHTML = ""; 
   
}
}