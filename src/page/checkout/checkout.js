import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js";
import { addCSS } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.9/element.js";

addCSS("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css");
// Harga satuan produk
let unitPrice = 80000;
const insuranceCost = 600;
const serviceFee = 1000;
const appFee = 1000;
let quantity = 1;

// Mendapatkan elemen-elemen yang diperlukan
const quantityEl = document.getElementById("quantity");
const totalProductPriceEl = document.getElementById("total-product-price");
const shippingCostEl = document.getElementById("shipping-cost");
const totalPriceEl = document.getElementById("total-price");
const deliveryTimeEl = document.getElementById("delivery-time");

// Fungsi untuk memperbarui harga total berdasarkan kuantitas
function updateQuantity(amount) {
  quantity = Math.max(1, quantity + amount); // Mengatur agar kuantitas minimal 1
  quantityEl.value = quantity; // Perbarui tampilan input kuantitas
  updateTotalPrice(); // Panggil untuk menghitung ulang harga total
}

// Validasi catatan agar tidak lebih dari 100 karakter
function validateNote() {
  const noteText = document.getElementById("note-text").value;
  if (noteText.length > 100) {
    alert("Catatan tidak boleh lebih dari 100 karakter.");
  }
}

// Memperbarui ongkos kirim berdasarkan pilihan pengguna
function updateShipping() {
  const shippingCost = parseInt(
    document.getElementById("shipping-option").value
  );
  shippingCostEl.innerText = `Rp${shippingCost.toLocaleString("id-ID")}`;
  updateTotalPrice();
}

// Memperbarui kurir dan estimasi waktu tiba
function updateCourier() {
  const courierOption = document.getElementById("courier-option").value;
  let estimateTime = "1 - 3 Nov";
  if (courierOption === "JNE") estimateTime = "2 - 4 Nov";
  else if (courierOption === "SiCepat") estimateTime = "1 - 2 Nov";
  deliveryTimeEl.innerText = `Estimasi tiba ${estimateTime}`;
}

// Menghitung dan memperbarui total harga
function updateTotalPrice() {
  const shippingCost = parseInt(
    document.getElementById("shipping-option").value
  );
  const totalProductPrice = unitPrice * quantity;
  const total =
    totalProductPrice + shippingCost + insuranceCost + serviceFee + appFee;

  totalProductPriceEl.innerText = `Rp${totalProductPrice.toLocaleString(
    "id-ID"
  )}`;
  totalPriceEl.innerText = `Rp${total.toLocaleString("id-ID")}`;
  // Menyimpan data checkout di Local Storage
  localStorage.setItem("totalProductPrice", totalProductPrice);
  localStorage.setItem("shippingCost", shippingCost);
  localStorage.setItem("totalPrice", total);
  localStorage.setItem("quantity", quantity);
}

// // Konfirmasi pembayaran
// function confirmPayment() {
//   const confirmation = confirm(
//     "Apakah Anda yakin ingin melanjutkan ke pembayaran?"
//   );
//   if (confirmation) {
//     // Ganti alert dengan SweetAlert2
//     Swal.fire({
//       icon: 'success',  // Menandakan bahwa pembayaran berhasil
//       title: 'Pembayaran Berhasil!',
//       text: 'Pembayaran berhasil diproses! OKE',
//     });

//     // Tambahkan logika untuk proses pembayaran di sini
//   } else {
//     // Opsional: Menambahkan alert jika user membatalkan pembayaran
//     Swal.fire({
//       icon: 'info',
//       title: 'Pembayaran Dibatalkan',
//       text: 'Anda membatalkan proses pembayaran.',
//     });
//   }
// }

// Memperbarui total harga awal saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  updateTotalPrice();
});

// Konfirmasi pembayaran
document
  .getElementById("tombolkonfir")
  .addEventListener("click", confirmPayment);

document
  .getElementById("tombolkonfir")
  .addEventListener("click", confirmPayment);

function confirmPayment() {
  // Gunakan SweetAlert2 untuk konfirmasi
  Swal.fire({
    title: "Apakah Anda yakin ingin melanjutkan ke pembayaran?",
    icon: "question", // Ikon pertanyaan
    showCancelButton: true, // Tampilkan tombol cancel
    confirmButtonText: "Ya, lanjutkan",
    cancelButtonText: "Batal",
  }).then((result) => {
    if (result.isConfirmed) {
      // Jika user memilih 'Ya, lanjutkan'
      Swal.fire({
        icon: "success",
        title: "Pembayaran Berhasil!",
        text: "Pembayaran berhasil diproses! OKE",
      });

      // Tambahkan logika untuk proses pembayaran di sini
    } else {
      // Jika user memilih 'Batal'
      Swal.fire({
        icon: "info",
        title: "Pembayaran Dibatalkan",
        text: "Anda membatalkan proses pembayaran.",
      });
    }
  });
}
