import {render} from '@watching/clips-react';
import {WinnerPick} from './WinnerPick';

export default render<'WatchThrough.Details.RenderAccessory'>(() => <WatchThroughDetails />)

function WatchThroughDetails() {
  return <WinnerPick />
}
