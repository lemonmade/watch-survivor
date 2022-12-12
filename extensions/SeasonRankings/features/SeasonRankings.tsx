import {useState, StrictMode} from 'react';
import {Text, BlockStack, Action, Modal} from '@watching/clips';
import {createRemoteReactComponent} from '@remote-ui/react';

const ReactText = createRemoteReactComponent(Text);
const ReactBlockStack = createRemoteReactComponent(BlockStack);
const ReactModal = createRemoteReactComponent(Modal);
const ReactAction = createRemoteReactComponent(Action, {
  fragmentProps: ['overlay'],
});

export function SeasonRankings() {
  const [count, setCount] = useState(0);

  return (
    <StrictMode>
      <ReactBlockStack spacing>
        <ReactText>
          Season rankings!!! (rendered at {new Date().toLocaleTimeString()})
        </ReactText>
        <ReactAction onPress={() => setCount((count) => count + 1)}>
          Click me! ({count})
        </ReactAction>
        <ReactAction overlay={<ReactModal padding>{count}</ReactModal>}>
          Modal
        </ReactAction>
      </ReactBlockStack>
    </StrictMode>
  );
}
