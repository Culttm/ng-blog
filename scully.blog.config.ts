import { ScullyConfig } from '@scullyio/scully';

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'blog',
  outDir: './dist/static',
  routes: {
    '/posts/:id': {
      type: 'json',
      id: {
        url: 'https://jsonplaceholder.typicode.com/posts?_limit=2',
        property: 'id',
      },
    },
  },
};
