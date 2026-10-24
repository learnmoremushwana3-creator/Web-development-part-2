// ========================================
// BRAAI MASTERS - MAIN JAVASCRIPT
// ========================================


// Run the code after the HTML page has loaded
document.addEventListener("DOMContentLoaded", function () {

    // ========================================
    // 1. AUTOMATIC COPYRIGHT YEAR
    // ========================================

    const copyrightYear = document.getElementById("copyrightYear");

    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }


    // ========================================
    // 2. SMOOTH SCROLLING
    // ========================================

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    internalLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            // Ignore empty links
            if (!targetId || targetId === "#") {
                return;
            }

            const targetElement = document.querySelector(targetId);

            // Scroll only when the target exists
            if (targetElement) {
                event.preventDefault();

                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });

    });


    // ========================================
    // 3. MOBILE NAVIGATION
    // ========================================

    const menuToggle = document.getElementById("menuToggle");
    const mainNavigation = document.getElementById("mainNavigation");

    if (menuToggle && mainNavigation) {

        menuToggle.addEventListener("click", function () {

            const isExpanded =
                menuToggle.getAttribute("aria-expanded") === "true";

            menuToggle.setAttribute(
                "aria-expanded",
                String(!isExpanded)
            );

            mainNavigation.classList.toggle("nav-open");

        });

        // Close the mobile menu after choosing a link
        const navigationLinks =
            mainNavigation.querySelectorAll("a");

        navigationLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                mainNavigation.classList.remove("nav-open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    // ========================================
    // 4. BACK-TO-TOP BUTTON
    // ========================================

    const backToTopButton =
        document.getElementById("backToTop");

    if (backToTopButton) {

        // Show the button after scrolling down
        window.addEventListener("scroll", function () {

            if (window.scrollY > 300) {
                backToTopButton.hidden = false;
            } else {
                backToTopButton.hidden = true;
            }

        });

        // Return to the top when clicked
        backToTopButton.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    // ========================================
    // 5. CURRENT PAGE NAVIGATION
    // ========================================

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    const pageLinks =
        document.querySelectorAll("nav a[href]");

    pageLinks.forEach(function (link) {

        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {

            link.setAttribute("aria-current", "page");

        } else {

            link.removeAttribute("aria-current");

        }

    });

});
