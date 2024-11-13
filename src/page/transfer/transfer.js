// Menunggu hingga halaman sepenuhnya dimuat sebelum menambahkan event listener
document.addEventListener('DOMContentLoaded', function () {

    // Menangani event submit pada form kirim uang
    document.getElementById('sendMoneyForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah form disubmit secara default

        // Mengambil nilai dari form
        const sendAmount = document.getElementById('sendAmount').value;
        const receiverCountry = document.getElementById('receiverCountry').value;
        const deliveryType = document.getElementById('deliveryType').value;

        // Validasi form, pastikan semua field sudah diisi
        if (!sendAmount || !receiverCountry || !deliveryType) {
            alert('Harap lengkapi semua data.');
            return; // Jika ada field yang kosong, hentikan eksekusi
        }

        // Membuat objek data untuk dikirim ke API
        const data = {
            sendAmount: sendAmount,
            receiverCountry: receiverCountry,
            deliveryType: deliveryType
        };

        // Mengirim data ke API menggunakan Fetch
        fetch('https://6734ee1b5995834c8a916658.mockapi.io/api/v1/transfer', {
            method: 'POST', // Menggunakan metode POST untuk mengirim data
            headers: {
                'Content-Type': 'application/json' // Mengirim data dalam format JSON
            },
            body: JSON.stringify(data) // Mengkonversi data objek menjadi string JSON
        })
        .then(response => response.json()) // Menangani respons API yang datang dalam format JSON
        .then(data => {
            // Jika transaksi berhasil, tampilkan notifikasi dengan data yang diterima
            alert('Transaksi berhasil: ' + JSON.stringify(data));
        })
        .catch(error => {
            // Menangani jika ada kesalahan dalam pengiriman data ke API
            console.error('Terjadi kesalahan:', error);
            alert('Terjadi kesalahan, coba lagi.');
        });
    });
});
