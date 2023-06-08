import '@watching/clips/elements';
import {extension, getQuery} from '@watching/clips';

import {type SeriesQueryData} from './SeriesQuery.graphql';
import startWatchThroughMutation from './StartWatchThroughMutation.graphql';

export default extension<'series.details.accessory', SeriesQueryData>(
  async (root, {query, mutate, target}) => {
    const {series} = getQuery<SeriesQueryData>(query);

    await new Promise((resolve) => setTimeout(resolve, 2000));

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

    const action = document.createElement('ui-action');
    action.textContent = 'Start watch through!';
    action.onPress = async () => {
      await mutate(startWatchThroughMutation);
    };

    const stack = document.createElement('ui-stack');
    stack.spacing = true;
    stack.append(textBlock, action);

    root.append(stack);
  },
);
