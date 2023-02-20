import {QuiltApp} from '@quilted/quilt';

import {Http} from './foundation/Http';
import {Head} from './foundation/Head';

import {Start} from './features/Start';

const routes = [{match: '/', render: <Start />}];

/**
 * The root component for your application.
 */
export default function App() {
  return <QuiltApp http={<Http />} html={<Head />} routes={routes} />;
}
