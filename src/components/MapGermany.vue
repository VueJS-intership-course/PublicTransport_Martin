<template>
  <div id="map" class="map"></div>
</template>

<script>
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from "ol/proj";
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Style, Circle, Fill, Stroke } from 'ol/style'; // Import style-related classes

export default {
  props: {
    journey: Array, 
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const map = new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: fromLonLat([5, 52]),
          zoom: 7,
        }),
      });
      this.map = map;

      this.visualizePoints(this.journey);
    },
    visualizePoints(journey) {
      const source = new VectorSource();
      journey.forEach(stop => {
        const lon = stop.Longitude;
        const lat = stop.Latitude;
        const point = new Point(fromLonLat([lon, lat]));
        const feature = new Feature({
          geometry: point,
        });

        const style = new Style({
          image: new Circle({
            radius: 6,
            fill: new Fill({ color: 'red' }),
            stroke: new Stroke({ color: 'black', width: 2 }),
          }),
        });

        feature.setStyle(style);
        source.addFeature(feature);
      });

      const vectorLayer = new VectorLayer({
        source: source,
      });

      this.map.addLayer(vectorLayer);
    },
  },
};
</script>

<style scoped>
.map {
  width: 50%;
  height: 600px;
  margin-left: 25px;
}
</style>
