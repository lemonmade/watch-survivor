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
  useSignalValue,
  useTranslate,
  type Signal,
} from '@watching/clips-react';

export function WinnerPick() {
  const count = useSignal(0);
  const disabled = useComputed(() => count.value % 2 === 0);
  const value = useSignal('abc');
  const t = useTranslate();

  const resolvedValue = useSignalValue(value);
  const resolvedCount = useSignalValue(count);

  return (
    <BlockStack spacing>
      <TextField
        changeTiming="input"
        label={t('count.label', {
          value: <Text emphasis>{resolvedValue}</Text>,
        })}
        value={value}
      />
      <BlockStack spacing="small">
        <Action
          disabled={useSignalValue(disabled)}
          overlay={
            <Popover inlineAttachment="start">
              <View padding="base">Popover! {resolvedValue}</View>
            </Popover>
          }
        >
          {t('actions.other', {count: resolvedCount})}
        </Action>
        <Action
          overlay={
            <Modal padding>
              <BlockStack spacing>
                <View>Modal! {resolvedValue}</View>
                <Action
                  onPress={async () => {
                    await new Promise<void>((resolve) => {
                      setTimeout(() => resolve(), 2_000);
                    });

                    console.log('Pressed in a modal!');
                  }}
                >
                  {t('actions.modal')}
                </Action>
              </BlockStack>
            </Modal>
          }
        >
          {t('actions.showModal')}
        </Action>
        <Action
          onPress={() => {
            count.value += 1;
          }}
        >
          {t('actions.increment', {count: resolvedCount})}
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
          {typeof value === 'object' && value != null && 'value' in value ? (
            <ApiValueSignalRenderer value={value} />
          ) : typeof value === 'function' ? (
            'function() {}'
          ) : (
            JSON.stringify(value)
          )}
        </View>
      ))}
    </BlockStack>
  );
}

function ApiValueSignalRenderer({value}: {value: Signal<any>}) {
  const resolvedValue = useSignalValue(value);
  return <Text>{JSON.stringify(resolvedValue)}</Text>;
}
