import {render} from '@remote-ui/react';
import {extension} from '@watching/clips';

import {SeasonRankings} from './SeasonRankings';

export default extension<'WatchThrough.Details.RenderAccessory'>((root) => {
  render(<SeasonRankings />, root);
});
