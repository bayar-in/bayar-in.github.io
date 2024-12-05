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
import { defaults as defaultControls } from "https://cdn.skypack.dev/ol/control.js";    

const attributions = '<a href="https://petapedia.github.io/" target="_blank">© PetaPedia</a>';
const defaultCoordinates = [107.57634352477324, -6.87436891415509];

// Layer dasar
const baseLayer = new TileLayer({
  source: new OSM({ attributions: attributions }),
});

// Sumber data dan layer untuk marker
const markerSource = new VectorSource();
const markerLayer = new VectorLayer({
  source: markerSource,
  style: new Style({
    image: new Icon({
      src: "data:image/svg+xml;charset=utf-8," +
        encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
          <path fill="red" d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 10.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>`),
      scale: 1,
      anchor: [0.5, 1],
    }),
  }),
});

// Sumber data dan layer untuk poligon
const polygonSource = new VectorSource();
const polygonLayer = new VectorLayer({
  source: polygonSource,
  style: new Style({
    fill: new Fill({ color: "rgba(165, 163, 164, 0.59)" }),
    stroke: new Stroke({ color: "gray", width: 2 }),
  }),
});

// Inisialisasi peta
const map = new Map({
  target: "map",
  layers: [baseLayer, markerLayer, polygonLayer],
  view: new View({
    center: fromLonLat(defaultCoordinates),
    zoom: 16,
  }),
});
    

// Variabel untuk menyimpan koordinat terakhir
let clickedCoordinates = null;

// Tangkap klik pada peta
map.on("singleclick", (event) => {
  clickedCoordinates = toLonLat(event.coordinate);
  console.log("Koordinat yang diklik:", clickedCoordinates);

  // Tambahkan marker pada lokasi yang diklik
  const marker = new Feature({ geometry: new Point(event.coordinate) });
  markerSource.clear(); // Bersihkan marker lama
  markerSource.addFeature(marker);
});

// Tombol "Tampilkan Region"
document.getElementById("searchRegion").addEventListener("click", async () => {
  if (!clickedCoordinates) {
    alert("Klik lokasi pada peta terlebih dahulu!");
    return;
  }

  // Simulasi fetch GeoJSON dari backend
  const mockGeoJSON = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [107.574, -6.872],
              [107.578, -6.872],
              [107.578, -6.876],
              [107.574, -6.876],
              [107.574, -6.872],
            ],
          ],
        },
        properties: {},
      },
    ],
  };

  displayPolygon(mockGeoJSON);
});

// Tombol "Tampilkan Jalan"
document.getElementById("searchRoad").addEventListener("click", async () => {
  const maxDistance = document.getElementById("maxDistance").value;
  if (!clickedCoordinates || !maxDistance) {
    alert("Klik lokasi pada peta dan masukkan jarak maksimum!");
    return;
  }

  // Simulasi fetch jalan (dalam bentuk GeoJSON)
  const mockRoadGeoJSON = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            [107.574, -6.874],
            [107.576, -6.875],
            [107.578, -6.874],
          ],
        },
        properties: {},
      },
    ],
  };

  displayRoads(mockRoadGeoJSON);
});

// Fungsi untuk menampilkan poligon
function displayPolygon(geoJSON) {
  const features = new GeoJSON().readFeatures(geoJSON, {
    dataProjection: "EPSG:4326",
    featureProjection: "EPSG:3857",
  });
  polygonSource.clear();
  polygonSource.addFeatures(features);
}

// Fungsi untuk menampilkan jalan
function displayRoads(geoJSON) {
  const features = new GeoJSON().readFeatures(geoJSON, {
    dataProjection: "EPSG:4326",
    featureProjection: "EPSG:3857",
  });
  polygonSource.clear();
  polygonSource.addFeatures(features);
}
