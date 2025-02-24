function togglePassword(inputId, iconSpan) {
    const passwordField = document.getElementById(inputId);
    const icon = iconSpan.querySelector("i");

    if (passwordField.type === "password") {
        passwordField.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        passwordField.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}

// Switch Forms
const toSignUp = document.getElementById("toSignUp");
const toSignIn = document.getElementById("toSignIn");
const signIn = document.querySelector(".sign-in");
const signUp = document.querySelector(".sign-up");

toSignUp.addEventListener("click", () => {
    signIn.classList.add("hidden");
    signUp.classList.add("active");
});

toSignIn.addEventListener("click", () => {
    signUp.classList.remove("active");
    signIn.classList.remove("hidden");
});

// Handle Form Submission
const handleFormSubmit = (url, data, callback) => {
    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(result => {
            alert(result.message);
            if (result.success) {
                localStorage.setItem("user", JSON.stringify(result.user)); // Store user in localStorage
                window.location.href = `profile.html?username=${result.user.username}`; // Redirect to profile page
            }
            if (callback) callback(result);
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Something went wrong!");
        });
};

// Sign-In
document.querySelector(".sign-in form").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;
    handleFormSubmit("http://localhost:5000/signin", { username, password });
});

// Sign-Up
document.querySelector(".sign-up form").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;
    const phone = e.target[2].value;
    const address = e.target[3].value;
    const email = e.target[4].value;
    handleFormSubmit("http://localhost:5000/signup", { username, password, phone, address, email });
});