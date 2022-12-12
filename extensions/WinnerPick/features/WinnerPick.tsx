import {
  BlockStack,
  Action,
  View,
  TextField,
  Text,
  Modal,
  Popover,
  useApi,
  useSignal,
  useComputed,
  Heading,
} from '@watching/clips-react';

export function WinnerPick() {
  const count = useSignal(0);
  const disabled = useComputed(() => count.value % 2 === 0);
  const value = useSignal('abc');

  return (
    <BlockStack spacing>
      <TextField
        changeTiming="input"
        label={
          <Text>
            Text field <Text emphasis>{value.value}</Text>
          </Text>
        }
        value={value}
      />
      <BlockStack spacing="small">
        <Action
          disabled={disabled}
          overlay={
            <Popover inlineAttachment="start">
              <View padding>Popover! {value.value}</View>
            </Popover>
          }
        >
          Other action ({value.value})
        </Action>
        <Action
          overlay={
            <Modal padding>
              <BlockStack spacing>
                <View>Modal! {value.value}</View>
                <Action
                  onPress={async () => {
                    await new Promise<void>((resolve) => {
                      setTimeout(() => resolve(), 2_000);
                    });

                    // eslint-disable-next-line no-console
                    console.log('Pressed in a modal!');
                  }}
                >
                  An action in a modal!
                </Action>
              </BlockStack>
            </Modal>
          }
        >
          Modal action
        </Action>
        <Action
          onPress={() => {
            count.value += 1;
          }}
        >
          Increment ({count.value})
        </Action>
      </BlockStack>

      <ApiDebug />
    </BlockStack>
  );
}

function ApiDebug() {
  const api = useApi();

  return (
    <BlockStack spacing="small">
      <Heading>Debug: API fields</Heading>
      {Object.entries(api).map(([key, value]) => (
        <View key={key}>
          <Text emphasis>{key}:</Text>{' '}
          {JSON.stringify(
            typeof value === 'object' && value != null && 'value' in value
              ? value.value
              : value,
          )}
        </View>
      ))}
    </BlockStack>
  );
}
