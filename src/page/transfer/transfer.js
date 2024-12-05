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

      const senderName = document.getElementById("senderName").value;
      const senderEmail = document.getElementById("senderEmail").value;
      const senderPhoneorrekening = document.getElementById(
        "senderPhoneorrekening"
      ).value;
      const sendAmount = document.getElementById("sendAmount").value;
      const selectedBank = document.getElementById("selectedBank").value;
      const deliveryType = document.getElementById("deliveryType").value;

      if (
        !senderName ||
        !senderEmail ||
        !senderPhoneorrekening ||
        !sendAmount ||
        !selectedBank ||
        !deliveryType
      ) {
        alert("Harap lengkapi semua data.");
        return;
      }

      const requestData = {
        user_id: senderPhoneorrekening,
        merchant_id: selectedBank,
        amount: parseFloat(sendAmount),
        currency: "IDR",
        status: "pending",
        description: `Transfer ke ${selectedBank} melalui ${deliveryType}`,
      };

      fetch(apiTransactionEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          alert("Transaksi berhasil: " + JSON.stringify(data));
          document.getElementById("sendMoneyForm").reset();
        })
        .catch((error) => {
          console.error("Terjadi kesalahan:", error);
          alert("Terjadi kesalahan, coba lagi.");
        });
    });
});
