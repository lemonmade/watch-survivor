import {
  Text as TextBase,
  Action as ActionBase,
  Modal as ModalBase,
  BlockStack as BlockStackBase,
} from '@watching/clips/elements';
import {extension} from '@watching/clips';
import type {
  RemoteElement,
  RemoteElementConstructor,
  RemotePropertiesFromElementConstructor,
  RemoteSlotsFromElementConstructor,
} from '@lemonmade/remote-ui/elements';

import h from 'solid-js/h';
import {
  createSignal,
  children,
  createMemo,
  onMount,
  type Component,
  type JSX,
  Signal,
  Accessor,
} from 'solid-js';
import {render} from 'solid-js/web';

export default extension((root) => {
  render(() => <SeasonRankings />, root);
});

const Text = createRemoteComponent('ui-text', TextBase);
const Action = createRemoteComponent('ui-action', ActionBase);
const Modal = createRemoteComponent('ui-modal', ModalBase);
const BlockStack = createRemoteComponent('ui-block-stack', BlockStackBase);

export function SeasonRankings() {
  const [count, setCount] = createSignal(0);
  const disabled = createMemo(() => count() % 2 === 0);
  onMount(() => {
    console.log('MOUNT');
  });

  return (
    <BlockStack spacing="small">
      <Text>
        Season rankings!!! (rendered at {new Date().toLocaleTimeString()})
      </Text>
      <Action
        onPress={() => {
          console.log('HERE');
          setCount(count() + 1);
        }}
      >
        Click me! {count()}
      </Action>
      <Action disabled={disabled()} overlay={<MyModal count={count} />}>
        Modal
      </Action>
    </BlockStack>
  );
}

function MyModal({count}: {count: Accessor<number>}) {
  return (
    <Modal slot="overlay" padding>
      {count()}
    </Modal>
  );
}

export type RemoteComponentType<
  Properties extends Record<string, any> = {},
  Slots extends Record<string, any> = {},
> = Component<RemoteComponentProps<Properties, Slots>>;

export type RemoteComponentProps<
  Properties extends Record<string, any> = {},
  Slots extends Record<string, any> = {},
> = Omit<Properties, keyof Slots> & {
  [Slot in keyof Slots]: JSX.Element;
} & {children?: JSX.Element; slot?: string};

export type RemoteComponentPropsFromElementConstructor<
  ElementConstructor extends RemoteElementConstructor<any, any>,
> = RemoteComponentProps<
  RemotePropertiesFromElementConstructor<ElementConstructor>,
  RemoteSlotsFromElementConstructor<ElementConstructor>
>;

export type RemoteComponentTypeFromElementConstructor<
  ElementConstructor extends RemoteElementConstructor<any, any>,
> = RemoteComponentType<
  RemotePropertiesFromElementConstructor<ElementConstructor>,
  RemoteSlotsFromElementConstructor<ElementConstructor>
>;

export function createRemoteComponent<
  Tag extends keyof HTMLElementTagNameMap,
  ElementConstructor extends RemoteElementConstructor<
    any,
    any
  > = HTMLElementTagNameMap[Tag] extends RemoteElement<
    infer Properties,
    infer Slots
  >
    ? RemoteElementConstructor<Properties, Slots>
    : never,
>(
  tag: Tag,
  Element: ElementConstructor | undefined = customElements.get(tag) as any,
): RemoteComponentType<
  RemotePropertiesFromElementConstructor<ElementConstructor>,
  RemoteSlotsFromElementConstructor<ElementConstructor>
> {
  const RemoteComponent: RemoteComponentTypeFromElementConstructor<ElementConstructor> =
    function RemoteComponent(props) {
      onMount(() => {
        console.log(`MOUNT ${tag}`);
      });

      return (() => {
        const additionalChildren: JSX.Element[] = [];
        const updatedProps: Record<string, any> = {};

        for (const prop in props) {
          if (prop === 'children') continue;

          if (prop === 'slot') {
            updatedProps.slot = props[prop];
            continue;
          }

          if (Element.remoteSlotDefinitions.has(prop)) {
            additionalChildren.push(
              h('remote-fragment', {slot: prop}, () => props[prop]),
            );
            continue;
          }

          const propValue = props[prop];

          // Preact assumes any properties starting with `on` are event listeners.
          // If we are in this situation, we try to use one of the property’s aliases,
          // which should be a name *not* starting with `on`.
          const definition = Element.remotePropertyDefinitions.get(prop);
          if (definition == null) continue;

          updatedProps[`prop:${prop}`] =
            typeof propValue === 'function' && definition.type === Function
              ? () => propValue
              : propValue;
        }

        return h(tag, updatedProps, props.children, additionalChildren);
      }) as any;
    };

  // RemoteComponent.displayName = `RemoteComponent(${tag})`;

  return RemoteComponent;
}

// Simple version of React.Children.toArray()
function toChildren(value: any) {
  if (value == null) return [];
  if (Array.isArray(value)) return value;
  return [value];
}
