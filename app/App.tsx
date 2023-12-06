import {useMemo, type PropsWithChildren} from 'react';

import {Routing, useRoutes} from '@quilted/quilt/navigate';
import {Localization} from '@quilted/quilt/localize';
import {HTML} from '@quilted/quilt/html';
import {PerformanceContext} from '@quilted/quilt/performance';
import {QueryClient} from '@tanstack/react-query';
import {ReactQueryContext} from '@quilted/react-query';

import {trpc} from '~/shared/trpc.ts';
import {
  AppContextReact,
  type AppContext as AppContextType,
} from '~/shared/context.ts';

import {Http} from './foundation/Http.tsx';
import {Head} from './foundation/Head.tsx';

import {Start} from './features/Start.tsx';

export interface Props extends AppContextType {}

// The root component for your application. You will typically render any
// app-wide context in this component.
export default function App(props: Props) {
  return (
    <PerformanceContext>
      <HTML>
        <Localization locale="en-CA">
          <Routing>
            <AppContext {...props}>
              <Http />
              <Head />
              <Routes />
            </AppContext>
          </Routing>
        </Localization>
      </HTML>
    </PerformanceContext>
  );
}

// This component renders the routes for your application. If you have a lot
// of routes, you may want to split this component into its own file.
function Routes() {
  return useRoutes([{match: '/', render: <Start />}]);
}

// This component renders any app-wide context.
function AppContext({
  children,
  ...appContext
}: PropsWithChildren<AppContextType>) {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <AppContextReact.Provider value={appContext}>
      <trpc.Provider client={appContext.trpc} queryClient={queryClient}>
        <ReactQueryContext client={queryClient}>{children}</ReactQueryContext>
      </trpc.Provider>
    </AppContextReact.Provider>
  );
}
