
// Updated croot.js
import Map from "https://cdn.skypack.dev/ol/Map.js";
import View from "https://cdn.skypack.dev/ol/View.js";
import TileLayer from "https://cdn.skypack.dev/ol/layer/Tile.js";
import VectorLayer from "https://cdn.skypack.dev/ol/layer/Vector.js";
import VectorSource from "https://cdn.skypack.dev/ol/source/Vector.js";
import OSM from "https://cdn.skypack.dev/ol/source/OSM.js";
import { fromLonLat, toLonLat } from "https://cdn.skypack.dev/ol/proj.js";
import { Style, Stroke, Icon, Fill } from "https://cdn.skypack.dev/ol/style.js";
import Point from "https://cdn.skypack.dev/ol/geom/Point.js";
import Feature from "https://cdn.skypack.dev/ol/Feature.js";
import GeoJSON from "https://cdn.skypack.dev/ol/format/GeoJSON.js";

// Base map and view
const basemap = new TileLayer({
  source: new OSM(),
});

const mapView = new View({
  center: fromLonLat([107.57634352477324, -6.87436891415509]),
  zoom: 16,
});

const roadsSource = new VectorSource();
const markerSource = new VectorSource();
const polygonSource = new VectorSource();

const roadsLayer = new VectorLayer({
  source: roadsSource,
  style: new Style({
    stroke: new Stroke({
      color: "blue",
      width: 2,
    }),
  }),
});

const markerLayer = new VectorLayer({
  source: markerSource,
  style: new Style({
    image: new Icon({
      src:
        "data:image/svg+xml;charset=utf-8," +
        encodeURIComponent(`
        <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24'>
          <path fill='red' d='M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 10.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/>
        </svg>`),
      scale: 1,
      anchor: [0.5, 1],
    }),
  }),
});

const polygonLayer = new VectorLayer({
  source: polygonSource,
  style: new Style({
    fill: new Fill({ color: "rgba(165, 163, 164, 0.59)" }),
    stroke: new Stroke({ color: "gray", width: 2 }),
  }),
});

const map = new Map({
  target: "map",
  layers: [basemap, roadsLayer, markerLayer, polygonLayer],
  view: mapView,
});

let clickedCoordinates = null;

// Add marker to map
function addMarker(coordinate) {
  const marker = new Feature({ geometry: new Point(coordinate) });
  markerSource.clear();
  markerSource.addFeature(marker);
}

// Fetch roads and display
async function fetchRoads(longitude, latitude, maxDistance) {
  try {
    const response = await fetch(
      "https://asia-southeast2-awangga.cloudfunctions.net/bayarin/data/get/roads",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          long: longitude,
          lat: latitude,
          max_distance: maxDistance,
        }),
      }
    );

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);


    return await response.json();
  } catch (error) {
    console.error("Error fetching roads:", error);
    return null;
  }
}

function displayRoads(geoJSON) {
  const features = new GeoJSON().readFeatures(geoJSON, {
    dataProjection: "EPSG:4326",
    featureProjection: "EPSG:3857",
  });
  roadsSource.clear();
  roadsSource.addFeatures(features);
}

// Event handlers
map.on("singleclick", (event) => {
  clickedCoordinates = toLonLat(event.coordinate);
  window.clickedCoordinates = clickedCoordinates; // Save globally for script.js
  addMarker(event.coordinate);
});

export { fetchRoads, displayRoads };
function checkLoginStatus() {
  const isLoggedIn = window.Cookies.get("login");

  // Jika belum login, tampilkan alert dan redirect ke halaman login
  if (isLoggedIn) {
        // Jika cookie ada, redirect ke dashboard
        Swal.fire({
          title: "Sukses",
          text: "Login Berhasil!!",
          icon: "success",
          confirmButtonText: "OK",
      }) // Ganti dengan URL dashboard Anda
    } else {
        // Jika cookie tidak ada, tampilkan alert atau lakukan tindakan lain
        Swal.fire({
            title: "Akses Ditolak",
            text: "Anda belum login. Silakan login terlebih dahulu.",
            icon: "warning",
            confirmButtonText: "OK",
        }).then(() => {
            window.location.href = "/login"; // Redirect ke halaman login
        });
    }
}