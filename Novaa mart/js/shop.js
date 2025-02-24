document.addEventListener("DOMContentLoaded", () => {
    // Category Dropdown Toggle
    const categoryToggles = document.querySelectorAll(".category-toggle");

    categoryToggles.forEach(toggle => {
        toggle.addEventListener("click", () => {
            const dropdown = toggle.nextElementSibling;

            // Close other open dropdowns
            document.querySelectorAll(".dropdown-products").forEach(menu => {
                if (menu !== dropdown) {
                    menu.style.display = "none";
                }
            });

            // Toggle the current dropdown
            dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
        });
    });

    // Close dropdowns if clicked outside
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".category-item")) {
            document.querySelectorAll(".dropdown-products").forEach(menu => {
                menu.style.display = "none";
            });
        }
    });

    // Initialize Carousel
    const carousels = document.querySelectorAll(".carousel");
    carousels.forEach(carousel => {
        let currentIndex = 0;
        const items = carousel.querySelectorAll(".carousel-item");
        const prevButton = carousel.querySelector(".carousel-control-prev");
        const nextButton = carousel.querySelector(".carousel-control-next");

        const updateCarousel = () => {
            items.forEach((item, index) => {
                item.style.display = index === currentIndex ? "flex" : "none";
            });
        };

        prevButton.addEventListener("click", () => {
            currentIndex = (currentIndex === 0) ? items.length - 1 : currentIndex - 1;
            updateCarousel();
        });

        nextButton.addEventListener("click", () => {
            currentIndex = (currentIndex === items.length - 1) ? 0 : currentIndex + 1;
            updateCarousel();
        });

        // Show the first item initially
        updateCarousel();
    });

    // Add to Cart Functionality
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        let cart = JSON.parse(localStorage.getItem(`cart_${user.username}`)) || [];
        let productCounts = JSON.parse(localStorage.getItem(`productCounts_${user.username}`)) || {};

        // Initialize product counts from Local Storage or default values
        document.querySelectorAll(".product-count").forEach(countElement => {
            const productId = countElement.getAttribute("data-id");
            if (productCounts[productId] === undefined) {
                productCounts[productId] = parseInt(countElement.textContent);
            }
            countElement.textContent = productCounts[productId];
        });

        addToCartButtons.forEach(button => {
            button.addEventListener("click", function () {
                const productId = this.getAttribute("data-id");
                const productElement = this.closest(".col-md-2");
                const productCountElement = productElement.querySelector(".product-count");

                if (productCounts[productId] > 0) {
                    productCounts[productId]--;
                    productCountElement.textContent = productCounts[productId];

                    const product = {
                        id: productId,
                        name: productElement.querySelector("p:nth-child(3)").textContent.replace("Product: ", ""),
                        price: productElement.querySelector("p:nth-child(4)").textContent.replace("Price: ", ""),
                        image: productElement.querySelector("img").src,
                        count: 1
                    };

                    const existingProduct = cart.find(item => item.id === productId);

                    if (existingProduct) {
                        existingProduct.count++;
                    } else {
                        cart.push(product);
                    }

                    localStorage.setItem(`cart_${user.username}`, JSON.stringify(cart));
                    localStorage.setItem(`productCounts_${user.username}`, JSON.stringify(productCounts));
                }
            });
        });

        // Reset product counts only on page refresh
        window.addEventListener("beforeunload", () => {
            localStorage.removeItem(`productCounts_${user.username}`);
        });
    } else {
        alert("Please sign in to add products to your cart.");
    }

    // Search Functionality
    const searchInput = document.getElementById("searchInput");
    const allProducts = document.querySelectorAll(".col-md-2");

    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();

        allProducts.forEach(product => {
            const productName = product.querySelector("p:nth-child(3)").textContent.toLowerCase();
            const brandName = product.querySelector("p:nth-child(2)").textContent.toLowerCase();

            if (productName.includes(searchTerm) || brandName.includes(searchTerm)) {
                product.style.display = "block"; // Show matching products
            } else {
                product.style.display = "none"; // Hide non-matching products
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Search Functionality
    const searchInput = document.getElementById("searchInput");
    const allProducts = document.querySelectorAll(".col-md-2.text-center");

    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();

        allProducts.forEach(product => {
            const productName = product.querySelector("p:nth-child(3)").textContent.toLowerCase();
            const brandName = product.querySelector("p:nth-child(2)").textContent.toLowerCase();

            if (productName.includes(searchTerm) || brandName.includes(searchTerm)) {
                product.style.display = "block"; // Show matching products
            } else {
                product.style.display = "none"; // Hide non-matching products
            }
        });
    });
});