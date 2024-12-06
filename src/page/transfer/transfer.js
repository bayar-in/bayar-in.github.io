document.addEventListener("DOMContentLoaded", function () {
  // Endpoint untuk transaksi
  const apiTransactionEndpoint =
    "https://asia-southeast2-awangga.cloudfunctions.net/bayarin/transaction/process";

  // Listener untuk tombol pilihan bank
  document.querySelectorAll(".bank-option").forEach((button) => {
    button.addEventListener("click", () => {
      document
        .querySelectorAll(".bank-option")
        .forEach((btn) => btn.classList.remove("selected"));
      button.classList.add("selected");
      document.getElementById("selectedBank").value =
        button.getAttribute("data-bank");
    });
  });

  // Submit form
  document
    .getElementById("sendMoneyForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      // Ambil nilai dari form
      const senderName = document.getElementById("senderName").value.trim();
      const senderEmail = document.getElementById("senderEmail").value.trim();
      const senderPhoneorrekening = document
        .getElementById("senderPhoneorrekening")
        .value.trim();
      const sendAmount = parseFloat(
        document.getElementById("sendAmount").value.trim()
      );
      const selectedBank = document.getElementById("selectedBank").value.trim();
      const deliveryType = document.getElementById("deliveryType").value.trim();

      // Validasi form
      if (
        !senderName ||
        !senderEmail ||
        !senderPhoneorrekening ||
        isNaN(sendAmount) ||
        sendAmount <= 0 ||
        !selectedBank ||
        !deliveryType
      ) {
        alert("Harap lengkapi semua data dengan benar.");
        return;
      }

      // Peta bank ke merchant_id
      const merchantIDs = {
        BRI: "672d353c627d47e285279f32",
        BCA: "abc123merchantidbca",
        Mandiri: "mandiriMerchantID",
        BNI: "bniMerchantID",
        ShopeePay: "shopeepayMerchantID",
        DANA: "danaMerchantID",
      };

      const merchant_id = merchantIDs[selectedBank];
      if (!merchant_id) {
        alert("Bank yang dipilih tidak valid.");
        return;
      }

      // Siapkan data untuk dikirim
      const requestData = {
        user_id: senderPhoneorrekening, // Nomor telepon pengguna sebagai user_id
        merchant_id: merchant_id, // merchant_id berdasarkan pilihan bank
        amount: sendAmount,
        currency: "IDR",
        status: "pending",
        description: `Transfer ke ${selectedBank} melalui ${deliveryType}`,
      };

      // Kirim data ke server
      fetch(apiTransactionEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((error) => {
              console.error("Detail error:", error);
              throw new Error(`HTTP error! Status: ${response.status}`);
            });
          }
          return response.json();
        })
        .then((data) => {
          alert("Transaksi Berhasil!");
          console.log("Transaksi berhasil: " + JSON.stringify(data));
          document.getElementById("sendMoneyForm").reset();
        })
        .catch((error) => {
          console.error("Terjadi kesalahan:", error);
          alert("Terjadi kesalahan saat memproses transaksi. Coba lagi.");
        });
    });
});
