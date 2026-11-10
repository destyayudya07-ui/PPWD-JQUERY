
// SEARCH PROJECT

const searchInput = document.getElementById("searchInput");
const projectCards = document.querySelectorAll(".project-card");
const noResult = document.getElementById("noResult");

searchInput.addEventListener("input", function () {
    const keyword = this.value.toLowerCase();
    let found = 0;

    projectCards.forEach(function (card) {
        const name = card.dataset.name.toLowerCase();

        if (name.includes(keyword)) {
            card.style.display = "flex";
            found++;
        } else {
            card.style.display = "none";
        }
    });

    noResult.style.display = found === 0 ? "block" : "none";
});


// DARK MODE

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeToggle.textContent = "Mode terang ☀";
    } else {
        themeToggle.textContent = "Mode gelap ☾";
    }
});
