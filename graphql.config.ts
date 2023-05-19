import * as path from 'path';
import {readFileSync} from 'fs';
import {parse} from '@iarna/toml';
import glob from 'fast-glob';

import {type Configuration} from '@quilted/craft/graphql';

const EXTENSION_FILE_NAME = 'extension.toml';
const EXTENSION_TARGET_SCHEMA_MAP = new Map([
  ['series.details.accessory', 'graphql/SeriesDetails.schema.graphql'],
  [
    'watch-through.details.accessory',
    'graphql/WatchThroughDetails.schema.graphql',
  ],
]);

const configuration: Configuration = {
  projects: {
    // WinnerPickSeriesDetails: {
    //   schema:
    //     'extensions/WinnerPick/node_modules/@watching/clips-react/graphql/SeriesDetails.schema.graphql',
    //   documents: 'extensions/WinnerPick/features/SeriesDetailsQuery.graphql',
    // },
    ...extensionConfiguration(),
  },
};

function extensionConfiguration() {
  try {
    const appConfig = readToml<{extensions?: string[]}>('app.toml');
    const extensions = glob
      .sync(appConfig.extensions ?? `**/${EXTENSION_FILE_NAME}`, {
        onlyFiles: false,
        ignore: ['**/node_modules/**'],
      })
      .map((match) =>
        match.endsWith('.toml') ? match : path.join(match, EXTENSION_FILE_NAME),
      );

    const pathsByTarget = new Map<string, string[]>();

    const projects: Extract<Configuration, {projects: any}>['projects'] = {};

    for (const extension of extensions) {
      const extensionRoot = path.dirname(extension);
      const extensionConfig = readToml<{
        extends: {target: string; query?: string}[];
      }>(extension);

      for (const {target, query} of extensionConfig.extends) {
        if (query == null) continue;

        const paths = pathsByTarget.get(target) ?? [];
        paths.push(path.join(extensionRoot, query));
        pathsByTarget.set(target, paths);
      }
    }

    for (const [target, paths] of pathsByTarget) {
      const schema = EXTENSION_TARGET_SCHEMA_MAP.get(target);

      if (schema == null) {
        throw new Error(`No schema found for extension target ${target}`);
      }

      projects[target] = {
        schema,
        documents: paths,
      };
    }

    return projects;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return {};
  }
}

function read(file: string) {
  return readFileSync(file, 'utf8');
}

function readToml<T = unknown>(file: string) {
  return parse(read(file)) as T;
}

export default configuration;
