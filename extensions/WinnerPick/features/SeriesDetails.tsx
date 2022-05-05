import {render} from '@watching/clips-react';
import {WinnerPick} from '../components/WinnerPick';

export default render<'Season.Details.RenderAccessory'>(() => (
  <SeriesDetails />
));

function SeriesDetails() {
  return <WinnerPick />;
}
