import '@watching/clips/elements';
import {extension, getQuery} from '@watching/clips';

import {type SeriesQueryData} from './SeriesQuery.graphql';
import startWatchThroughMutation from './StartWatchThroughMutation.graphql';

export default extension<'series.details.accessory', SeriesQueryData>(
  async (root, {query, mutate, target}) => {
    const {series} = getQuery<SeriesQueryData>(query);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const seriesNameText = document.createTextNode(series.name);

    query.subscribe(() => {
      const {series} = getQuery<SeriesQueryData>(query);
      seriesNameText.data = series.name;
    });

    const seriesText = document.createElement('ui-text');
    seriesText.emphasis = true;
    seriesText.append(seriesNameText);

    const targetText = document.createElement('ui-text');
    targetText.emphasis = true;
    targetText.append(target);

    const textBlock = document.createElement('ui-text-block');
    textBlock.append(
      'You are rendering in the ',
      targetText,
      ' extension point, on a series named ',
      seriesText,
      '!',
    );

    const button = document.createElement('ui-button');
    button.textContent = 'Start watch through!';
    button.addEventListener('press', (event) => {
      event.respondWith(mutate(startWatchThroughMutation));
    });

    const textField = document.createElement('ui-text-field');
    textField.addEventListener('input', (event) => {
      valueLabel.textContent = (event.target as any).value;
      console.log('input', (event.target as any).value);
    });

    const label = document.createElement('ui-text');
    label.textContent = 'Rating (';
    label.slot = 'label';
    textField.append(label);

    const valueLabel = document.createElement('ui-text');
    valueLabel.textContent = '';
    valueLabel.emphasis = true;
    label.append(valueLabel, ')');

    const stack = document.createElement('ui-stack');
    stack.setAttribute('spacing', 'auto');
    stack.append(textBlock, button, textField);

    root.append(stack);
  },
);
