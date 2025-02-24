document.addEventListener('DOMContentLoaded', function () {
    const paymentOptions = document.querySelectorAll('.payment-option');
    const paymentDetails = document.getElementById('payment-details');
    const payButton = document.getElementById('pay-button');
    const cartItemsList = document.getElementById('cart-items-list');
    const totalPriceElement = document.getElementById('total-price');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = 0;

    // Display cart items and calculate total price
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.innerHTML = `
            <span>${item.name} (${item.count})</span>
            <span>${item.price}</span>
        `;
        cartItemsList.appendChild(listItem);
        totalPrice += parseFloat(item.price.replace('$', '')) * item.count;
    });

    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;

    // Show payment details when a payment method is selected
    paymentOptions.forEach(option => {
        option.addEventListener('click', () => {
            paymentDetails.style.display = 'block';
            payButton.style.display = 'block';
        });
    });

    // Handle Pay Now button click
    payButton.addEventListener('click', () => {
        const upiId = document.getElementById('upi-id').value;
        if (upiId) {
            alert(`Payment successful! UPI ID: ${upiId}`);
            localStorage.removeItem('cart');
            window.location.href = '../intro.html';
        } else {
            alert('Please enter a valid UPI ID or mobile number.');
        }
    });
});