import {View, useApi} from '@watching/clips-react';

export function WinnerPick() {
  return (
    <View>
      {Object.entries(useApi()).map(([key, value]) => <View key={key}>
        {key}: {JSON.stringify(value)}
      </View>)}
    </View>
  )
}
