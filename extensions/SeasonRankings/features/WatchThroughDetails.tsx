import {extension} from '@watching/clips';
import '@lemonmade/remote-ui-react/polyfill';
import {createElement} from 'react';
import {createRoot} from 'react-dom/client';

import {SeasonRankings} from './SeasonRankings';

export default extension((root) => {
  createRoot(root).render(createElement(SeasonRankings));
});
