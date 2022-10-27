import {useSignal} from '@quilted/react-signals';
import {BlockStack, Action, View, useApi} from '@watching/clips-react';

export function WinnerPick() {
  const api = useApi();
  const count = useSignal(0);

  return (
    <BlockStack spacing>
      {Object.entries(api).map(([key, value]) => (
        <View key={key}>
          {key}:{' '}
          {JSON.stringify(
            typeof value === 'object' && value != null && 'value' in value
              ? value.value
              : value,
          )}
        </View>
      ))}
      <Action
        onPress={() => {
          count.value += 1;
        }}
      >
        Increment ({count.value})
      </Action>
    </BlockStack>
  );
}
