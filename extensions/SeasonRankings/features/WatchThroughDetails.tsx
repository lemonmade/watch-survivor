import {render, Text} from '@watching/clips-react';

export default render<'WatchThrough.Details.RenderAccessory'>(() => (
  <WatchThroughDetails />
));

function WatchThroughDetails() {
  return (
    <Text>
      Season rankings!!! (rendered at {new Date().toLocaleTimeString()})
    </Text>
  );
}
