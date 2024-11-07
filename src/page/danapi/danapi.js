document.getElementById("payment-form").addEventListener("submit", function(event) {
    event.preventDefault();  // Mencegah form disubmit secara tradisional
  
    const amount = document.getElementById("amount").value;
    const partnerReferenceNo = document.getElementById("referenceNo").value;
  
    // JSON payload untuk API Dana
    const jsonPayload = {
      "merchantId": "00007100010926",  // Ganti dengan merchant ID Anda
      "subMerchantId": "310928924949487",  // Ganti dengan sub-merchant ID Anda
      "storeId": "abcd",  // Ganti dengan store ID Anda
      "partnerReferenceNo": partnerReferenceNo,
      "amount": {
        "value": amount,
        "currency": "IDR"
      },
      "feeAmount": {
        "value": "0.00",  // Misalnya jika tidak ada biaya tambahan
        "currency": "IDR"
      },
      "validityPeriod": new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(), // Berlaku 1 jam
      "additionalInfo": {
        "terminalSource": "MER"
      }
    };
  
    // Menentukan headers untuk permintaan
    const headers = {
      "Content-Type": "application/json",
      "X-TIMESTAMP": new Date().toISOString(),
      "X-SIGNATURE": "YOUR_SIGNATURE",  // Ganti dengan signature yang valid
      "X-PARTNER-ID": "YOUR_PARTNER_ID",  // Ganti dengan Partner ID yang valid
      "CHANNEL-ID": "95221"
    };
  
    // URL API untuk mengenerate QRIS
    const url = "http://api.sandbox.dana.id/v1.0/qr/qr-mpm-generate.htm";
  
    // Melakukan permintaan POST untuk generate QRIS
    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(jsonPayload)
    })
    .then(response => response.json())
    .then(data => {
      if (data.qrCodeUrl) {
        document.getElementById("qris-image").src = data.qrCodeUrl;
      } else {
        alert("Error generating QR code.");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Error generating QR code.");
    });
  });
  