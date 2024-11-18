document.addEventListener("DOMContentLoaded", function () {
  // Daftar endpoint API MockAPI.io untuk masing-masing bank
  const apiEndpoints = {
    BRI: "https://673b8d4396b8dcd5f3f6bd6b.mockapi.io/api/v1/bri",
    BCA: "https://673b8d4396b8dcd5f3f6bd6b.mockapi.io/api/v1/bca",
    Mandiri: "https://673b8eb296b8dcd5f3f6c28d.mockapi.io/api/v1/mandiri",
    BNI: "https://673b8eb296b8dcd5f3f6c28d.mockapi.io/api/v1/bni",
    ShopeePay: "https://673b8f2096b8dcd5f3f6c42d.mockapi.io/api/v1/shopeepay",
    DANA: "https://673b8f2096b8dcd5f3f6c42d.mockapi.io/api/v1/dana",
  };

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

      const apiEndpoint = apiEndpoints[selectedBank];
      if (!apiEndpoint) {
        alert("Bank tidak valid.");
        return;
      }

      const data = {
        senderName,
        senderEmail,
        senderPhoneorrekening,
        sendAmount,
        bankSelect: selectedBank,
        deliveryType,
      };

      fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
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
