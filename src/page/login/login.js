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
      window.location.replace("/index.html");
      alert("Login berhasil");
      console.log(responseData);
    } else {
      alert(responseData.message || "Login gagal, periksa kembali data Anda.");
      console.log(responseData); // untuk memeriksa error dari server
    }
  });

document.addEventListener("DOMContentLoaded", function () {
  const signInBtn = document.getElementById("sign-in-btn");

  if (localStorage.getItem("isLoggedIn") === "true") {
 
    signInBtn.textContent = "Log out";
    signInBtn.href = "#"; 
    signInBtn.addEventListener("click", logout);
  } else {

    signInBtn.href = "/src/page/login/login.html";
  }
});

function logout() {
  // Hapus status login dan token dari localStorage
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("token");
  // Refresh halaman agar tombol kembali ke kondisi "Sign in"
  location.reload();
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
