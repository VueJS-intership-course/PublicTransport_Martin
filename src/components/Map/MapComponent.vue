<template>
  <div id="map" class="map"></div>
  <div ref="popup" class="popup">
    <div id="popupContent">
      <p>Station Name: {{ stationName }}</p>
      <p>Station Status: {{ stationStatus }}</p>
      <p>Wheel Chair: {{ isWheelChairAccessible }}</p>
    </div>
  </div>
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
import Overlay from 'ol/Overlay';

export default {
  props: ['stationsData'],
  data() {
    return {
      map: null,
      layer: null,
      popup: null,
      clickedStation: null,
      stationName: '',
      stationStatus: '',
      isWheelChairAccessible: ''
    };
  },
  watch: {
    stationsData(newValue) {
      if (newValue) {
        this.setStationsOnMap(newValue);
      }
    },
  },
  methods: {
    initMap() {
      this.map = new Map({
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

      this.popup = new Overlay({
        element: this.$refs.popup,
        positioning: 'bottom-center',
        offset: [0, -10],
      });
      this.map.addOverlay(this.popup);

      this.map.on('click', (evt) => {
        const feature = this.map.forEachFeatureAtPixel(evt.pixel, (feature) => feature);
        if (feature) {
          this.clickedStation = feature.values_; //feature.getProperties(); allows to access the properties of the clicked station
          // console.log(feature.values_);
          // console.log(this.clickedStation);
          this.openPopup();
        } else {
          this.closePopup();
        }
      });
    },
    setStationsOnMap(stationsData) {
      if (this.layer) {
        this.map.removeLayer(this.layer);
      }

      const vectorSource = new VectorSource();
      console.log(vectorSource);
      const vectorLayer = new VectorLayer({ source: vectorSource });
      this.layer = vectorLayer;

      stationsData.forEach((stop) => {
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
          properties: stop, 
        });
        feature.setStyle(pointStyle);
        vectorSource.addFeature(feature);
      });
      this.map.addLayer(vectorLayer);
    },
    openPopup() {
        const stationData = this.clickedStation.properties;
        this.stationName = stationData.DestinationName50;
        this.stationStatus = stationData.TripStopStatus;
        this.isWheelChairAccessible = stationData.WheelChairAccessible;
        this.popup.setPosition(this.clickedStation.geometry.flatCoordinates);
    },
    closePopup() {
      this.popup.setPosition(undefined);
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

.popup {
  background-color: #007bff;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 25px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
