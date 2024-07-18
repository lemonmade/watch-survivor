import type {Configuration} from '@quilted/graphql-tools/configuration';
import {extensionGraphQLProjects} from '@watching/cli/tools/graphql';

const configuration = {
  projects: extensionGraphQLProjects(),
} satisfies Configuration;

export default configuration;
