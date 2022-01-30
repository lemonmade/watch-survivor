import {render} from '@watching/clips-react';
import {WinnerPick} from './WinnerPick';

export default render<'Series.Details.RenderAccessory'>(() => <SeriesDetails />)

function SeriesDetails() {
  return <WinnerPick />
}
