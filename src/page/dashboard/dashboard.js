// import { endpointLogin } from "./../helper/url.js";
// console.log(endpointLogin);

// document
//   .querySelector(".login-form")
//   .addEventListener("submit", async function (event) {
//     event.preventDefault();
//     const formData = new FormData(this);
//     const data = Object.fromEntries(formData);

//     const response = await fetch(
//       "https://asia-southeast2-awangga.cloudfunctions.net/bayarin/auth/log-in",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       }
//     );

//     const responseData = await response.json();

//     if (response.ok) {
//       localStorage.setItem("isLoggedIn", true);
//       localStorage.setItem("token", responseData.token);
//       window.location.replace("./../dashboard/dashboard.html");
//       alert("Login berhasil");
//       console.log(responseData);
//     } else {
//       alert(responseData.message || "Login gagal, periksa kembali data Anda.");
//       console.log(responseData); // untuk memeriksa error dari server
//     }
//   });

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
  // Hapus status login dan token dari localStorage
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("token");

  // Redirect ke halaman login atau homepage
  window.location.href = "/bayar-in.github.io/index.html";
}

// Fungsi untuk memeriksa status login
function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // Jika belum login, tampilkan alert dan redirect ke halaman login
  if (isLoggedIn !== "true") {
    Swal.fire({
      title: "Akses Ditolak",
      text: "Anda belum login. Silakan login terlebih dahulu.",
      icon: "warning",
      confirmButtonText: "OK",
    }).then(() => {
      window.location.href = "/bayar-in.github.io/src/page/login/login.html";
    });
  }
}

// Event listener saat DOM selesai dimuat
document.addEventListener("DOMContentLoaded", () => {
  // Periksa status login
  checkLoginStatus();

  // Tambahkan event listener ke tombol logout
  const logoutLinks = document.querySelectorAll('[onclick="logout()"]');
  logoutLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // Cegah default link behavior
      logout();
    });
  });
});

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
