<script lang="ts">
  import {getApi} from '@watching/clips-svelte';
  import type {SeriesQueryData} from './SeriesQuery.graphql';

  const api = getApi<'series.details.accessory', SeriesQueryData>();
  const query = api.query;

  let count = 0;

  function handlePress() {
    console.log('You clicked me!');
    count += 1;
  }
</script>

<ui-block-stack spacing="small">
  <ui-text-block>
    You are rendering in the <ui-text emphasis>{api.target}</ui-text>
    extension point, on a series named
    <ui-text emphasis="strong">{$query.series.name}</ui-text>!
  </ui-text-block>

  <ui-action on:press={handlePress}>
    Click me (count: {count})
  </ui-action>

  <ui-action>
    Modal
    <ui-modal padding slot="overlay">
      Count: {count}
    </ui-modal>
  </ui-action>
</ui-block-stack>
