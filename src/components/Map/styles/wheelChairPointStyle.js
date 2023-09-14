import { Style, Circle, Fill, Stroke } from 'ol/style';

const wheelChairPointStyle = new Style({
  image: new Circle({
    radius: 6,
    fill: new Fill({
      color: 'blue',
    }),
    stroke: new Stroke({
      color: 'black',
      width: 2,
    }),
  }),
});

export default wheelChairPointStyle;