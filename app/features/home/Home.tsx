import {useRouteData} from '@quilted/quilt/navigation';

import styles from './Home.module.css';

export function Home() {
  const data = useRouteData();

  return (
    <div>
      <div className={styles.Home}>{JSON.stringify(data)}!</div>
      <form action="/create" method="post">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}
