document.addEventListener("DOMContentLoaded", function () {
  // Event handler untuk pemilihan bank dengan logo
  document.querySelectorAll('.bank-option').forEach(button => {
      button.addEventListener('click', () => {
          // Menghapus class 'selected' dari semua pilihan bank
          document.querySelectorAll('.bank-option').forEach(btn => btn.classList.remove('selected'));
          
          // Menambahkan class 'selected' ke bank yang dipilih
          button.classList.add('selected');
          
          // Set nilai bank yang dipilih ke input tersembunyi
          document.getElementById('selectedBank').value = button.getAttribute('data-bank');
      });
  });

  // Event handler untuk form submit
  document.getElementById("sendMoneyForm").addEventListener("submit", function (event) {
      event.preventDefault(); // Mencegah form disubmit secara default

      // Mengambil nilai dari form
      const senderName = document.getElementById("senderName").value;
      const senderEmail = document.getElementById("senderEmail").value;
      const senderPhoneorrekening = document.getElementById("senderPhoneorrekening").value;
      const sendAmount = document.getElementById("sendAmount").value;
      const selectedBank = document.getElementById("selectedBank").value;
      const deliveryType = document.getElementById("deliveryType").value;

      // Validasi form, pastikan semua field sudah diisi
      if (!senderName || !senderEmail || !senderPhoneorrekening || !sendAmount || !selectedBank || !deliveryType) {
          alert("Harap lengkapi semua data.");
          return;
      }

      // Membuat objek data untuk dikirim ke API
      const data = {
          senderName: senderName,
          senderEmail: senderEmail,
          senderPhoneorrekening: senderPhoneorrekening,
          sendAmount: sendAmount,
          bankSelect: selectedBank,
          deliveryType: deliveryType,
      };

      // Mengirim data ke API menggunakan Fetch
      fetch("https://6734ee1b5995834c8a916658.mockapi.io/api/v1/transfer", {
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
