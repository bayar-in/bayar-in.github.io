// import { endpointLogin } from "./../helper/url.js";
// console.log(endpointLogin);

document
  .querySelector(".login-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    const response = await fetch(
      "https://asia-southeast2-awangga.cloudfunctions.net/bayarin/auth/log-in",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const responseData = await response.json();

    if (response.ok) {
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("token", responseData.token);
      window.location.replace("./../dashboard/dashboard.html");
      // alert("Login berhasil");
      Swal.fire("Login Berhasil")
      console.log(responseData);
    } else {
      swal({
        title: "Error",
        text: responseData.message || "Login gagal, periksa kembali data Anda.",
        icon: "error", // You can change this to "success", "warning", etc. based on your needs
        button: "OK", // Customize the button text if needed
      }).then(() => {
        console.log(responseData); // untuk memeriksa error dari server
      });
      // alert(responseData.message || "Login gagal, periksa kembali data Anda.");
      // console.log(responseData); // untuk memeriksa error dari server
    }
  });

// document.addEventListener("DOMContentLoaded", function () {
//   const signInBtn = document.getElementById("sign-in-btn");

//   if (localStorage.getItem("isLoggedIn") === "true") {
 
//     signInBtn.textContent = "Log out";
//     signInBtn.href = "#"; 
//     signInBtn.addEventListener("click", logout);
//   } else {

//     signInBtn.href = "./../dashboard/dashboard.html";
//   }
// });

function logout() {
  // Remove login status and token from localStorage
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("token");
  window.Cookies.remove("login")

  // Clear cookies related to Google Analytics (if necessary)
  document.cookie = '_ga_B66QPE5BY6=; Max-Age=0; path=/; domain=' + window.location.hostname;
  document.cookie = '_ga=; Max-Age=0; path=/; domain=' + window.location.hostname;

  // Redirect to index.html after logout
  window.location.href = "./index.html"; // Redirect to index.html
}

// document.querySelector(".login-form").addEventListener("submit", async function (event) {
//     event.preventDefault();
//     const formData = new FormData(this);
//     const data = Object.fromEntries(formData);
//     const response = await fetch("http://localhost:8080/login", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//     });
//     const responseData = await response.json();
//     if (response.ok) {
//         localStorage.setItem("token", responseData.token);
//         window.location.replace("/index.html");
//         alert("percobaan berhasil");
//         console.log(responseData);

//     } else {
//         alert(responseData.message);
//     }
// });

// function getUserDetails() {
//     return fetch(endpointLogin, {
//         headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//     }).then((response) => response.json());
// }
