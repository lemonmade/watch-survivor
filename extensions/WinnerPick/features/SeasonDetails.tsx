import {render} from '@watching/clips-react';
import {WinnerPick} from '../components/WinnerPick';

export default render<'Season.Details.RenderAccessory'>(() => (
  <SeasonDetails />
));

function SeasonDetails() {
  return <WinnerPick />;
}
