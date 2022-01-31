import {render, Text} from '@watching/clips-react';

export default render<'Season.Details.RenderAccessory'>(() => <SeasonDetails />)

function SeasonDetails() {
  return <Text>Season rankings! (rendered at {new Date().toLocaleTimeString()})</Text>
}
