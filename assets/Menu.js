const menuSearch = document.getElementById("menuSearch");
const categoryFilter = document.getElementById("categoryFilter");
const priceSort = document.getElementById("priceSort");
const resetFilters = document.getElementById("resetFilters");
const menuGrid = document.getElementById("menuGrid");
const menuResults = document.getElementById("menuResults");
const noResults = document.getElementById("noResults");

const menuItems = Array.from(
    menuGrid.querySelectorAll(".menu-item")
);

function updateMenu() {

    const searchText = menuSearch.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;
    const selectedSort = priceSort.value;

    let filteredItems = menuItems.filter(function (item) {

        const itemText = item.textContent.toLowerCase();
        const itemCategory = item.dataset.category;

        const matchesSearch = itemText.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            itemCategory === selectedCategory;

        return matchesSearch && matchesCategory;
    });

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

    menuItems.forEach(function (item) {
        item.hidden = true;
    });

    filteredItems.forEach(function (item) {
        item.hidden = false;
        menuGrid.appendChild(item);
    });

    menuResults.textContent =
        filteredItems.length + " meal(s) found.";

    noResults.hidden = filteredItems.length !== 0;
}

menuSearch.addEventListener("input", updateMenu);

categoryFilter.addEventListener("change", updateMenu);

priceSort.addEventListener("change", updateMenu);

resetFilters.addEventListener("click", function () {

    menuSearch.value = "";
    categoryFilter.value = "all";
    priceSort.value = "default";

    updateMenu();
});

updateMenu();
```
