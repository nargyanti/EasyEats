import "./components/about-me.js"

function main() {

    const baseUrl = "https://www.themealdb.com/api/json/v1/1/";
    const searchButton = document.querySelector(".search-button")
    const randomButton = document.querySelector(".random");

    // Melakukan pengambilan meal secara acak dan me-render hasilnya
    randomButton.addEventListener("click", function () {
        fetch(`${baseUrl}/random.php`)
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                if (responseJson.meals) {
                    renderMealsCards(responseJson.meals);
                }
            })
            .catch(error => {
                showResponseMessage(error)
            })
    });

    // Melakukan pencarian dan me-render hasilnya
    searchButton.addEventListener("click", function () {
        const keyword = document.querySelector('.input-keyword');
        fetch(`${baseUrl}/search.php?s=${keyword.value}`)
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                if (responseJson.meals) {
                    renderMealsCards(responseJson.meals);
                } else {
                    showResponseMessage(`${keyword.value} is not found`);
                }
            })
            .catch(error => {
                showResponseMessage(error)
            })
    })

    // Render daftar meal dalam bentuk card
    const renderMealsCards = (meals) => {
        const listContentElement = document.querySelector("#contentCard");
        const mainTitle = document.querySelector(".main-title");

        mainTitle.innerHTML = "";
        mainTitle.innerHTML = `<h1 class="font-weight-bold text-center mt-3 main-title">Meals</h1>`;

        listContentElement.innerHTML = "";
        meals.forEach(meal => {
            listContentElement.innerHTML += `
            <div class="col mb-4">
                <div class="card">
                    <div class="card-body p-0">
                        <h4 class="card-title">${meal.strMeal}</h4>
                        <img src="${meal.strMealThumb}"
                        class="card-img-top pb-2" alt="...">
                        <button type="button" class="btn btn-outline-dark modal-recipe" data-idmeal="${meal.idMeal}" data-toggle="modal" data-target="#staticBackdrop">Show Details</button>
                        <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="staticBackdropLabel">Recipe</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body"></div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        });

        // Menampilkan resep dalam bentul modal
        const modalRecipeButton = document.querySelectorAll('.modal-recipe');
        modalRecipeButton.forEach(button => {
            button.addEventListener('click', function () {
                const idMeal = this.dataset.idmeal;
                fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
                    .then(response => {
                        return response.json();
                    })
                    .then(responseJson => {
                        if (responseJson.meals) {
                            renderRecipe(responseJson.meals);
                        } else {
                            showResponseMessage(responseJson.message);
                        }
                    })
                    .catch(error => {
                        showResponseMessage(error)
                    })
            })
        })
    }

    // Me-render resep
    const renderRecipe = (meals) => {
        const modalRecipe = document.querySelector(".modal-body");
        modalRecipe.innerHTML = "";
        meals.forEach(meal => {
            const ingredients = [];
            for (let i = 1; i <= 20; i++) {
                if (meal[`strIngredient${i}`]) {
                    ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
                } else {
                    break;
                }
            }
            modalRecipe.innerHTML += `
                <h2 class="font-weight-bold text-center">${meal.strMeal}</h2>
                <img src="${meal.strMealThumb}" srcset="" style="max-width: 250px;" class="my-3">
                <h4 class="text-left">Ingredients:</h4>
                <ul class="text-left ingredients">                            
                ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join("")}
                </ul>
                <h4 class="text-left">Steps:</h4>
                <p  class="text-justify">${meal.strInstructions}</p>
        `;
        })
    }

    // Pesan error
    const showResponseMessage = (message = "Check your internet connection") => {
        alert(message);
    };

}

export default main;