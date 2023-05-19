import {useState, createElement} from 'react';
import {Action, Modal} from '@watching/clips';
import {createRemoteComponent} from '@lemonmade/remote-ui-react';

const PreactAction = createRemoteComponent('ui-action', Action);

const PreactModal = createRemoteComponent('ui-modal', Modal);

export function SeasonRankings() {
  const [count, setCount] = useState(0);

  return createElement(
    'ui-block-stack',
    {spacing: 'small'},
    createElement(
      'ui-text',
      null,
      `Season rankings!!! (rendered at ${new Date().toLocaleTimeString()})`,
    ),
    createElement(
      PreactAction,
      {onPress: () => setCount((count) => count + 1)},
      `Click me! (${count})`,
    ),
    createElement(
      PreactAction,
      {overlay: createElement(PreactModal, {padding: true}, count)},
      `Modal`,
    ),
  );
}
