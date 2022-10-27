import {useEffect} from 'react';
import styles from './Start.module.css';

export function Start() {
  useEffect(() => {
    fetch('/api', {method: 'POST'})
      .then((result) => result.json())
      // eslint-disable-next-line no-console
      .then(console.log, console.error);
  });

  return <div className={styles.Start}>Hello world!!</div>;
}
