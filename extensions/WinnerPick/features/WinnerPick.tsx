import {
  BlockStack,
  Button,
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
        label={
          <Text>
            {t('count.label', {
              value: <Text emphasis>{resolvedValue}</Text>,
            })}
          </Text>
        }
        value={value.peek()}
        onInput={(newValue) => {
          value.value = newValue;
        }}
      />
      <BlockStack spacing="small">
        <Button
          disabled={useSignalValue(disabled)}
          overlay={
            <Popover inlineAttachment="start">
              <View padding>Popover! {resolvedValue}</View>
            </Popover>
          }
        >
          {t('actions.other', {count: resolvedCount})}
        </Button>
        <Button
          overlay={
            <Modal padding>
              <BlockStack spacing>
                <View>Modal! {resolvedValue}</View>
                <Button
                  onPress={async () => {
                    await new Promise<void>((resolve) => {
                      setTimeout(() => resolve(), 2_000);
                    });

                    console.log('Pressed in a modal!');
                  }}
                >
                  {t('actions.modal')}
                </Button>
              </BlockStack>
            </Modal>
          }
        >
          {t('actions.showModal')}
        </Button>
        <Button
          onPress={() => {
            count.value += 1;
          }}
        >
          {t('actions.increment', {count: resolvedCount})}
        </Button>
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
