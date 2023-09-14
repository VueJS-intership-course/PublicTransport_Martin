import { Style, Circle, Fill, Stroke } from 'ol/style';

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

export default pointStyle;