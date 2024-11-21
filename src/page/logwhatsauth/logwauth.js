import {
    qrController,
    deleteCookie,
  } from "https://cdn.jsdelivr.net/gh/whatsauth/js@0.2.1/whatsauth.js";
  import { wauthparam } from "https://cdn.jsdelivr.net/gh/whatsauth/js@0.2.1/config.js";
  
  wauthparam.auth_ws = "d3NzOi8vYXBpLndhLm15LmlkL3dzL3doYXRzYXV0aC9wdWJsaWM=";
  //wauthparam.keyword="aHR0cHM6Ly93YS5tZS82Mjg5NTgwMDAwNjAwMD90ZXh0PXdoNHQ1YXV0aDA=";
  wauthparam.keyword = "aHR0cHM6Ly93YS5tZS82Mjg4MTAyMjUyMjkyMD90ZXh0PXdoNHQ1YXV0aDA=";
  wauthparam.tokencookiehourslifetime = 18;
  wauthparam.redirect = "/index.html";
  deleteCookie(wauthparam.tokencookiename);
  qrController(wauthparam);

  const checkLoginStatus = () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${wauthparam.tokencookiename}=`));
  
    const signInBtn = document.getElementById("sign-in-btn");
    const profileSection = document.getElementById("profile-section");
  
    if (token) {
      // Jika sudah login, tampilkan tombol logout
      signInBtn.style.display = "none";
      profileSection.style.display = "flex";
    } else {
      // Jika belum login, tampilkan tombol login
      signInBtn.style.display = "block";
      profileSection.style.display = "none";
    }
  };
  
  const logout = () => {
    deleteCookie(wauthparam.tokencookiename);
    checkLoginStatus();
  };
  
  // Panggil fungsi saat halaman dimuat
  document.addEventListener("DOMContentLoaded", () => {
    checkLoginStatus();
  
    // Tambahkan event listener untuk tombol logout
    const logoutBtn = document.getElementById("profile-section").querySelector("button");
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      logout();
    });
  });
  
  // Jalankan fungsi QR controller untuk login
  qrController(wauthparam);