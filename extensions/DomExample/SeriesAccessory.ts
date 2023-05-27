import '@watching/clips/elements';
import {extension} from '@watching/clips-svelte';
import SeriesAccessory from './SeriesAccessory.svelte';

export default extension((_, options) => {
  return new SeriesAccessory(options);
});
