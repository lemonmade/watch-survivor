import {extension, Text} from '@watching/clips-react';

export default extension<'WatchThrough.Details.RenderAccessory'>(() => (
  <WatchThroughDetails />
));

function WatchThroughDetails() {
  return (
    <Text>
      Season rankings!!! (rendered at {new Date().toLocaleTimeString()})
    </Text>
  );
}
