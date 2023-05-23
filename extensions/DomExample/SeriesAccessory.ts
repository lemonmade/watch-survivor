import {extension} from '@watching/clips';
import '@watching/clips/elements';

import SeriesAccessory from './SeriesAccessory.svelte';
// import {type SeriesQueryData} from './SeriesQuery.graphql';

export default extension((root, api) => {
  new SeriesAccessory({
    target: root,
    props: {api},
    context: new Map([['clips.api', api]]),
  });
});
