import {render} from '@watching/clips-react';
import {WinnerPick} from '../components/WinnerPick';

export default render<'WatchThrough.Details.RenderAccessory'>(() => (
  <WatchThroughDetails />
));

function WatchThroughDetails() {
  return <WinnerPick />;
}
