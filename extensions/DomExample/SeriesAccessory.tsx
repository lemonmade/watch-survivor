import '@watching/clips/elements';
import {extension} from '@watching/clips';

import {render} from 'solid-js/web';

export default extension((root) => {
  render(() => <SeasonRankings />, root);
});

import {createSignal} from 'solid-js';

export function SeasonRankings() {
  const [count, setCount] = createSignal(0);

  return (
    <ui-block-stack spacing="small">
      <ui-text>
        Season rankings!!! (rendered at {new Date().toLocaleTimeString()})
      </ui-text>
      <ui-action
        prop:onPress={() => {
          setCount(count() + 1);
        }}
      >
        Click me! {count()}
      </ui-action>
      <ui-action>
        Modal
        <ui-modal slot="overlay" padding>
          {count()}
        </ui-modal>
      </ui-action>
    </ui-block-stack>
  );
}
