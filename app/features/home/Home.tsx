import {trpc} from '~/shared/trpc.ts';

import styles from './Home.module.css';

export function Home() {
  const [data] = trpc.message.useSuspenseQuery('World');

  return <div className={styles.Home}>{data}!</div>;
}
