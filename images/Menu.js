```javascript
// Get the HTML elements
const menuSearch = document.getElementById("menuSearch");
const categoryFilter = document.getElementById("categoryFilter");
const priceSort = document.getElementById("priceSort");
const resetFilters = document.getElementById("resetFilters");
const menuGrid = document.getElementById("menuGrid");
const menuResults = document.getElementById("menuResults");
const noResults = document.getElementById("noResults");

// Get all menu items
const menuItems = Array.from(
    menuGrid.querySelectorAll(".menu-item")
);

// Search, filter and sort menu items
function updateMenu() {

    const searchText = menuSearch.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;
    const selectedSort = priceSort.value;

    // Find items matching the search and category
    let filteredItems = menuItems.filter(function (item) {

        const itemText = item.textContent.toLowerCase();
        const itemCategory = item.dataset.category;

        const matchesSearch = itemText.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            itemCategory === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    // Sort items by price
    if (selectedSort === "low-high") {

        filteredItems.sort(function (a, b) {
            return Number(a.dataset.price) -
                   Number(b.dataset.price);
        });

    } else if (selectedSort === "high-low") {

        filteredItems.sort(function (a, b) {
            return Number(b.dataset.price) -
                   Number(a.dataset.price);
        });

    }

    // Hide all items before displaying matching items
    menuItems.forEach(function (item) {
        item.hidden = true;
    });

    // Display the matching items in the selected order
    filteredItems.forEach(function (item) {
        item.hidden = false;
        menuGrid.appendChild(item);
    });

    // Update the result message
    menuResults.textContent =
        filteredItems.length + " meal(s) found.";

    // Show a message when no items match
    noResults.hidden = filteredItems.length !== 0;
}

// Respond when the customer searches
menuSearch.addEventListener("input", updateMenu);

// Respond when the category changes
categoryFilter.addEventListener("change", updateMenu);

// Respond when the sorting option changes
priceSort.addEventListener("change", updateMenu);

// Reset all filters
resetFilters.addEventListener("click", function () {

    menuSearch.value = "";
    categoryFilter.value = "all";
    priceSort.value = "default";

    updateMenu();
});

// Initialise the menu
updateMenu();
```
