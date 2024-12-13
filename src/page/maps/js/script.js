import { fetchRoads, displayRoads } from "./croot.js";

document.addEventListener("DOMContentLoaded", () => {
  // Toggle button logic
  document.getElementById("toggle-btn").addEventListener("click", function () {
    const toggleContent = document.getElementById("toggle-content");

    if (toggleContent.classList.contains("hidden")) {
      toggleContent.classList.remove("hidden");
      toggleContent.classList.add("visible");
      this.textContent = "Hide";
    } else {
      toggleContent.classList.remove("visible");
      toggleContent.classList.add("hidden");
      this.textContent = "Show";
    }
  });

  // Calculate Distance button logic
  document
    .getElementById("btn-distance")
    .addEventListener("click", async function () {
      const distanceInput = document.getElementById("distance-input").value;
      const resultInfo = document.getElementById("result-info");

      if (distanceInput && distanceInput > 0) {
        if (window.clickedCoordinates) {
          const [longitude, latitude] = window.clickedCoordinates;
          const maxDistance = parseFloat(distanceInput);

          const roadsData = await fetchRoads(longitude, latitude, maxDistance);
          if (roadsData) {
            resultInfo.textContent = `Jarak maksimum: ${maxDistance} meter.`;
            resultInfo.style.display = "block";
            resultInfo.style.color = "green";
            const geoJSON = convertToGeoJSON(roadsData);
            displayRoads(geoJSON);
          } else {
            resultInfo.textContent = "Gagal mendapatkan data jalan.";
            resultInfo.style.display = "block";
            resultInfo.style.color = "red";
          }
        } else {
          alert("Silakan pilih lokasi pada peta terlebih dahulu.");
        }
      } else {
        resultInfo.textContent = "Masukkan radius yang valid!";
        resultInfo.style.display = "block";
        resultInfo.style.color = "red";
      }
    });

  // Region Search button logic
  document
    .getElementById("regionSearch")
    .addEventListener("click", async function () {
      if (window.clickedCoordinates) {
        const [longitude, latitude] = window.clickedCoordinates;

        const geoJSON = await fetchRegionGeoJSON(longitude, latitude); // Pastikan fungsi ini ada di croot.js
        if (geoJSON) {
          displayPolygonOnMap(geoJSON); // Fungsi ini harus didefinisikan di croot.js
        } else {
          alert("Gagal mendapatkan data wilayah. Coba lagi.");
        }
      } else {
        alert("Klik pada peta untuk memilih wilayah terlebih dahulu.");
      }
    });
});

// Utility function to convert API response to GeoJSON
function convertToGeoJSON(response) {
  return {
    type: "FeatureCollection",
    features: response.map((item) => ({
      type: "Feature",
      geometry: item.geometry,
      properties: item.properties,
    })),
  };
}
