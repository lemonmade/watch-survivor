<script lang="ts">
  import {getContext} from 'svelte';
  import type {
    WithThreadSignals,
    Api,
    Signal,
    ExtensionPoint,
  } from '@watching/clips';
  import type {SeriesQueryData} from './SeriesQuery.graphql';

  const api = getContext('clips.api') as WithThreadSignals<Api<ExtensionPoint>>;
  const query = api.query as any as Signal<SeriesQueryData>;
</script>

<ui-text-block>
  You are rendering in the <ui-text emphasis={true}>{api.target}</ui-text>
  extension point, on a series named
  <ui-text emphasis={true}>{$query.series.name}</ui-text>!
</ui-text-block>
