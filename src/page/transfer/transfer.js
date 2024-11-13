document
  .getElementById("sendMoneyForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const amount = document.getElementById("sendAmount").value;
    const country = document.getElementById("receiverCountry").value;
    const deliveryType = document.getElementById("deliveryType").value;

    // Validasi data untuk memastikan tidak ada data yang kosong
    if (!amount || !country || !deliveryType) {
      alert("Semua field harus diisi!");
      return;
    }

    console.log(
      JSON.stringify({
        amount: amount,
        country: country,
        deliveryType: deliveryType,
      })
    );

    fetch("https://6734ee1b5995834c8a916658.mockapi.io/api/v1/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount,
        country: country,
        deliveryType: deliveryType,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid request");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Sukses:", data);
        alert("Pengiriman berhasil!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Pengiriman gagal!");
      });
  });
