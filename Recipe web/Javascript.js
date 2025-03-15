let recipes = JSON.parse(localStorage.getItem("recipes")) || [
    { image: "Images/Masala dose.jpg", title: "Masala Dosa", description: "Simple and crispy breakfast with delicious taste.", detailsPage: "masaladosa.html" },
    { image: "Images/Upma.jpg", title: "Upma", description: "Simple and easy delicious breakfast.", detailsPage: "upma.html" },
    { image: "Images/Bisi bele bhaat.jpg", title: "Bisi bele Bhaat", description: "Hot and very tasty rice-based breakfast with vegetables.", detailsPage: "bisibelebhaat.html" },
    { image: "Images/Puliyogare.JPG", title: "Puliogare/ Tamarind Rice", description: "Tasty and quick breakfast with rice and tamarind juice.", detailsPage: "puliogare.html" },
    { image: "Images/Biryani.jpg", title: "Chicken Biryani", description: "Most famous and tasty non-veg dish.", detailsPage: "biryani.html" },
    { image: "Images/Nati koli.jpg", title: "Naati Koli/ Chicken Curry", description: "Most delicious chicken curry.", detailsPage: "naatikoli.html" },
    { image: "Images/Kabab.JPG", title: "Chicken Kabab", description: "Most famous chicken side dish.", detailsPage: "kabab.html" },
    { image: "Images/Fish fry.jpg", title: "Fish Fry", description: "Most delicious fish side dish.", detailsPage: "fishfry.html" }
];

console.log("Loaded recipes from localStorage:", recipes);

function addRecipe() {

    const category = document.getElementById('cat').value;
    const title = document.getElementById('name').value;
    const imageFile = document.getElementById('image').files[0];
    const style = document.getElementById('style').value;
    const serve = document.getElementById('serve').value;
    const variety = document.getElementById('variety').value;
    const description = document.getElementById('descript').value;
    const time = document.getElementById('time').value;
    const ingred = document.getElementById('ingred').value;
    const procedure = document.getElementById('procedure').value.trim();

    if (!category || !imageFile || !title || !description || !time || !ingred || !procedure || !style || !serve || !variety) {
        alert("Enter all the fields and retry");
        return false;
    }

    if (description.length > 80) {
        alert("Description should be only within 80 characters");
        return false;
    }

    console.log("Captured Procedure:", procedure);

    const reader = new FileReader();
    reader.onload = function (event) {
        const image = event.target.result;
        recipes.push({ 
            title, description, image, detailsPage: "recipe-detail.html", 
            category, style, serve, variety, time, ingredients: ingred, procedure 
        });
        console.log("Recipes after addition:", recipes);
        console.log("Captured Procedure:", procedure);
        localStorage.setItem("recipes", JSON.stringify(recipes));
        alert("Successfully added.");
        alert(" Please refresh the website if you want to add another recipe.");
        displayRecipes();
    };
    reader.readAsDataURL(imageFile);
}

function searchRecipes() {
    const search = document.getElementById('search').value.toLowerCase();
    displayRecipes(search);
}

function displayRecipes(filter = "") {
    const recipeList = document.getElementById('recipeList');
    recipeList.innerHTML = '';
    
    let filteredRecipes = recipes.filter(recipe => recipe.title.toLowerCase().includes(filter.trim()));
    
    filteredRecipes.forEach((recipe, index) => {
        const div = document.createElement('div');
        div.classList.add('recipe-card');
        div.innerHTML = `<img src="${recipe.image}" alt="${recipe.title}">
                         <h2>${recipe.title}</h2>
                         <p>${recipe.description}</p>`;
        
        div.onclick = function () { openRecipeDetail(index); };
        
        recipeList.appendChild(div);
    });
}
displayRecipes();

let formImage = document.getElementById("form-image");
let imageDis = document.getElementById('image');
imageDis.onchange = function () {
    formImage.src = URL.createObjectURL(imageDis.files[0]);
};

function deleteRecipe() {
    let recipeNames = recipes.slice(8).map(recipe => recipe.title);
    if (recipeNames.length === 0) {
        alert("No user-added recipes to delete.");
        return;
    }

    let recipeToDelete = prompt(`Enter the exact recipe name to delete:\n\n${recipeNames.join("\n")}`);
    
    if (!recipeToDelete) return;

    let index = recipes.findIndex(recipe => recipe.title.toLowerCase() === recipeToDelete.toLowerCase());

    if (index === -1 || index < 8) {
        alert("Invalid recipe name or you cannot delete predefined recipes.");
        return;
    }

    if (confirm(`Are you sure you want to delete "${recipes[index].title}"?`)) {
        recipes.splice(index, 1);
        localStorage.setItem("recipes", JSON.stringify(recipes));
        displayRecipes();
        alert("Recipe deleted successfully.");
    }
}

function openRecipeDetail(index) {
    const recipe = recipes[index];

    if (recipe.detailsPage !== "recipe-detail.html") {
        window.location.href = recipe.detailsPage;
    } else {
        localStorage.setItem("currentRecipe", JSON.stringify(recipe));
        window.location.href = "recipe-detail.html";
    }
}

function toggleMenu() {
    let nav = document.querySelector(".nav-links");
    nav.classList.toggle("active");
}