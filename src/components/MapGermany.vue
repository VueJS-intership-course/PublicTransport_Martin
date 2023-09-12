<template>
  <div id="map" class="map"></div>
</template>

<script>
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Style, Circle, Fill, Stroke } from 'ol/style'; 

export default {
  props: {
    journey: Array,
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const vectorSource = new VectorSource();
      const vectorLayer = new VectorLayer({ source: vectorSource });
      const coord = fromLonLat([4.7452703, 52.640007]);
      const map = new Map({
        layers: [new TileLayer({ source: new OSM() })],
        view: new View({ center: fromLonLat([5, 52]), zoom: 1 }),
        target: 'map',
      });
      const feature = new Feature({ geometry: new Point(coord) });
      vectorSource.addFeature(feature);
      map.addLayer(vectorLayer);
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
