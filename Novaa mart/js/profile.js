// Fetch user details from localStorage or server
const user = JSON.parse(localStorage.getItem("user"));

if (user) {
    // Display user details from localStorage
    document.getElementById("profile-username").textContent = user.username;
    document.getElementById("profile-phone").textContent = user.phone;
    document.getElementById("profile-address").textContent = user.address;
    document.getElementById("profile-email").textContent = user.email;
} else {
    // Fetch user details from the server if not in localStorage
    const username = new URLSearchParams(window.location.search).get("username");

    if (username) {
        fetch(`http://localhost:5000/user?username=${username}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("User not found or server error!");
                }
                return response.json();
            })
            .then(user => {
                localStorage.setItem("user", JSON.stringify(user)); // Store user in localStorage
                document.getElementById("profile-username").textContent = user.username;
                document.getElementById("profile-phone").textContent = user.phone;
                document.getElementById("profile-address").textContent = user.address;
                document.getElementById("profile-email").textContent = user.email;
            })
            .catch(error => {
                console.error("Error fetching user details:", error);
                alert("Failed to load user details. Please try again.");
                window.location.href = "sign-in.html"; // Redirect to sign-in page
            });
    } else {
        alert("You are not signed in. Redirecting to the sign-in page.");
        window.location.href = "sign-in.html"; // Redirect to sign-in page
    }
}

// Logout Button
document.getElementById("logout-button").addEventListener("click", () => {
    localStorage.removeItem("user"); // Clear user data from localStorage
    window.location.href = "sign-in.html"; // Redirect to sign-in page
});