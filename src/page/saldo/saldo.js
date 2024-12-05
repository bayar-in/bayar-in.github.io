document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "https://6734ee1b5995834c8a916658.mockapi.io/api/v1/saldo"; // Ganti dengan endpoint MockAPI Anda
  const saldoContainer = document.getElementById("saldoContainer");
  const refreshButton = document.getElementById("refreshButton");

  // Fungsi untuk mengambil data saldo
  function fetchSaldo() {
    saldoContainer.innerHTML = "<p>Memuat data saldo...</p>";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        saldoContainer.innerHTML = ""; // Kosongkan container sebelum menampilkan data
        data.forEach((user) => {
          const saldoDiv = document.createElement("div");
          saldoDiv.className = "saldo-item";
          saldoDiv.innerHTML = `
                        <h2>${user.name}</h2>
                        <p>Saldo: Rp${user.balance.toLocaleString()}</p>
                    `;
          saldoContainer.appendChild(saldoDiv);
        });
      })
      .catch((error) => {
        console.error("Error fetching saldo:", error);
        saldoContainer.innerHTML =
          "<p>Gagal memuat data saldo. Coba lagi nanti.</p>";
      });
  }

  // Event listener untuk tombol refresh
  refreshButton.addEventListener("click", fetchSaldo);

  // Ambil data saldo saat halaman dimuat
  fetchSaldo();
});
