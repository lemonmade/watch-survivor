import {type RenderableProps} from 'preact';

import {Navigation, route} from '@quilted/quilt/navigation';
import {NotFound} from '@quilted/quilt/server';

import {
  AppContextReact,
  type AppContext as AppContextType,
} from '~/shared/context.ts';

import {HTML} from './foundation/html.ts';
import {Frame} from './foundation/frame.ts';

import {Home} from './features/home.ts';

export interface AppProps {
  context: AppContextType;
}

// Define the routes for your application. If you have a lot of routes, you
// might want to split this into a separate file.
const routes = [
  route('*', {
    render: (children) => <Frame>{children}</Frame>,
    children: [
      route('/', {
        load: () => Promise.resolve({data: 'Hello World'}),
        render: <Home />,
      }),
      route('*', {render: <NotFound />}),
    ],
  }),
];

// The root component for your application. You will typically render any
// app-wide context in this component.
export function App({context}: AppProps) {
  return (
    <AppContext context={context}>
      <HTML>
        <Navigation routes={routes} context={context} />
      </HTML>
    </AppContext>
  );
}

export default App;

// This component renders any app-wide context.
function AppContext({children, context}: RenderableProps<AppProps>) {
  return (
    <AppContextReact.Provider value={context}>
      {children}
    </AppContextReact.Provider>
  );
}
