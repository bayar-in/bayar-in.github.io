// Inisialisasi form dan menangani pengiriman
document.getElementById('sendMoneyForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Mengambil data dari form
    const amount = document.getElementById('sendAmount').value;
    const country = document.getElementById('receiverCountry').value;
    const deliveryType = document.getElementById('deliveryType').value;

    // Menampilkan data dalam alert untuk sementara
    alert(`Jumlah: ${amount}\nNegara Penerima: ${country}\nTipe Pengiriman: ${deliveryType}`);

    // TODO: Tambahkan logika untuk mengirim data ke server backend
});

document.getElementById('sendMoneyForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const amount = document.getElementById('sendAmount').value;
    const country = document.getElementById('receiverCountry').value;
    const deliveryType = document.getElementById('deliveryType').value;

    fetch('https://6734ee1b5995834c8a916658.mockapi.io/api/v1/transactions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            amount: amount,
            country: country,
            deliveryType: deliveryType
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Sukses:', data);
        alert('Pengiriman berhasil!');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Pengiriman gagal!');
    });
});

