import {extension, Text, BlockStack, Action} from '@watching/clips-dom';
import {h, createApp, ref, defineComponent} from 'vue';

const VueBlockStack = defineComponent({
  name: 'BlockStack',
  inheritAttrs: false,
  render() {
    return h(BlockStack, this.$attrs, this.$slots);
  },
});

const VueAction = defineComponent({
  name: 'Action',
  inheritAttrs: false,
  render() {
    return h(Action, normalizeProps(this.$attrs), this.$slots);
  },
});

function normalizeProps($attrs: Record<string, any>) {
  const props = {...$attrs};

  for (const [prop, value] of Object.entries(props)) {
    if (prop[0] === 'o' && prop[1] === 'n') {
      props[`_${prop}`] = value;
      delete props[prop];
    }
  }

  return props;
}

export default extension((root, {target}) => {
  createApp({
    setup() {
      const count = ref(0);

      // const interval = setInterval(() => {
      //   count.value += 1;
      // }, 1_000);

      // onUnmounted(() => {
      //   clearInterval(interval);
      // });

      return {
        count,
      };
    },
    render() {
      return h(VueBlockStack, {spacing: true}, () => [
        h(Text, {}, [
          'You are rendering in the ',
          h(Text, {emphasis: true}, target),
          ' extension point! (count: ',
          this.count,
          ')',
        ]),
        h(
          VueAction,
          {
            onPress: () => {
              this.count += 1;

              return new Promise((resolve) => {
                setTimeout(resolve, 1_000);
              });
            },
          },
          () => 'Click me!',
        ),
      ]);
    },
  }).mount(root);
});
