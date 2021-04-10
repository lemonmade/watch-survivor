import {View, useApi, useConfiguration} from '@watching/clips-react';

export function WinnerPick() {
  const configuration = useConfiguration();

  return (
    <View>
      {Object.entries(useApi()).map(([key, value]) => <View key={key}>
        {key}: {JSON.stringify(value)}
      </View>)}
      <View>configuration: {JSON.stringify(configuration)}</View>
    </View>
  )
}
