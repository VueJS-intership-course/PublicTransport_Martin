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
  props: ['stationsData'],
  methods: {
    initMap() {
      const map = new Map({
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: fromLonLat([5, 52]),
          zoom: 7,
        }),
        target: 'map',
      });

      const vectorSource = new VectorSource();
      const vectorLayer = new VectorLayer({ source: vectorSource });

      this.stationsData.forEach((stop) => {
        const longitude = stop.Longitude;
        const latitude = stop.Latitude;
        const coordinates = fromLonLat([longitude, latitude]);

        const pointStyle = new Style({
          image: new Circle({
            radius: 6,
            fill: new Fill({
              color: 'red',
            }),
            stroke: new Stroke({
              color: 'black',
              width: 2,
            }),
          }),
        });

        const feature = new Feature({
          geometry: new Point(coordinates),
        });
        feature.setStyle(pointStyle);
        vectorSource.addFeature(feature);
      });
      map.addLayer(vectorLayer);
    },
  },
  mounted() {
    this.initMap();
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
