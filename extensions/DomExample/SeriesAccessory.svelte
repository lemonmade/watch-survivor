<script lang="ts">
  import type {
    WithThreadSignals,
    Api,
    Signal,
    ExtensionPoint,
  } from '@watching/clips';
  import type {SeriesQueryData} from './SeriesQuery.graphql';

  export let api: WithThreadSignals<Api<ExtensionPoint>>;
  export const query = api.query as any as Signal<SeriesQueryData>;
</script>

<ui-text-block>
  You are rendering in the <ui-text emphasis={true}>{api.target}</ui-text>
  extension point, on a series named
  <ui-text emphasis={true}>{$query.series.name}</ui-text>!
</ui-text-block>
