import {render, Text} from '@watching/clips-react';

export default render<'Series.Details.RenderAccessory'>(() => (
  <SeriesDetails />
));

function SeriesDetails() {
  return (
    <Text>
      Season rankings! (rendered at {new Date().toLocaleTimeString()})
    </Text>
  );
}
