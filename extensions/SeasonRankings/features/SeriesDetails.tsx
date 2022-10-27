import {extension, Text} from '@watching/clips-react';

export default extension<'Series.Details.RenderAccessory'>(() => (
  <SeriesDetails />
));

function SeriesDetails() {
  return (
    <Text>
      Season rankings!!! (rendered at {new Date().toLocaleTimeString()})
    </Text>
  );
}
