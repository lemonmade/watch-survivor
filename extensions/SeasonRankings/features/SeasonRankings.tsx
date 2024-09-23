import {
  Text,
  Button,
  BlockStack,
  Modal,
  useSignal,
} from '@watching/clips-preact';

export function SeasonRankings() {
  const count = useSignal(0);

  return (
    <BlockStack spacing="small">
      <Text>
        Season rankings!!! (rendered at {new Date().toLocaleTimeString()})
      </Text>
      <Button
        onPress={() => {
          count.value += 1;
        }}
      >
        Click me! {count.value}
      </Button>
      <Button overlay={<Modal padding>{count.value}</Modal>}>Modal</Button>
    </BlockStack>
  );
}
