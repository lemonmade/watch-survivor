import {type Configuration} from '@quilted/craft/graphql';
import {extensionGraphQLProjects} from '@watching/cli/tools/graphql';

const configuration: Configuration = {
  projects: extensionGraphQLProjects(),
};

export default configuration;
