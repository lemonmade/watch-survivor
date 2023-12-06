import {trpc} from '~/shared/trpc.ts';

import styles from './Start.module.css';

export function Start() {
  const [data] = trpc.message.useSuspenseQuery('World');

  return <div className={styles.Start}>{data}!!!</div>;
}
