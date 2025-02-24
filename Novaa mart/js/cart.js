document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cart-items");
    const buyNowButton = document.getElementById("buy-now");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        alert("You are not signed in. Redirecting to the sign-in page.");
        window.location.href = "sign-in.html";
        return;
    }

    // Fetch cart data for the logged-in user
    let cart = JSON.parse(localStorage.getItem(`cart_${user.username}`)) || [];

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        buyNowButton.style.display = "none"; // Hide Buy Now button if cart is empty
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement("div");
            cartItem.className = "col-md-4 cart-item";
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h5>${item.name}</h5>
                <p>Price: ${item.price}</p>
                <p>Quantity: ${item.count}</p>
                <button class="btn btn-danger remove-from-cart" data-id="${item.id}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        // Add event listeners to remove buttons
        const removeButtons = document.querySelectorAll(".remove-from-cart");
        removeButtons.forEach(button => {
            button.addEventListener("click", function () {
                const productId = this.getAttribute("data-id");
                const productIndex = cart.findIndex(item => item.id === productId);

                if (productIndex !== -1) {
                    const removedProduct = cart.splice(productIndex, 1)[0];
                    localStorage.setItem(`cart_${user.username}`, JSON.stringify(cart));
                    location.reload(); // Refresh the cart page to reflect changes
                }
            });
        });
    }

    // Redirect to payment page when Buy Now is clicked
    buyNowButton.addEventListener("click", () => {
        window.location.href = "pay.html";
    });
});