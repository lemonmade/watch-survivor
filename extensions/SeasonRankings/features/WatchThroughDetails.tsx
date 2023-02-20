import {createRoot} from '@remote-ui/react';
import {extension} from '@watching/clips';

import {SeasonRankings} from './SeasonRankings';

export default extension<'WatchThrough.Details.RenderAccessory'>((root) => {
  createRoot(root).render(<SeasonRankings />);
});
