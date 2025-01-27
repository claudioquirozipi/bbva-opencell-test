import { RouteDefinition } from '@open-cells/core/types'; 

export const routes: RouteDefinition[] = [
  {
    path: '/',
    name: 'home',
    component: 'home-page',
    action: async () => {
      await import('../pages/home/home-page.js');
    },
  },
  {
    path: '/create-client',
    name: 'create-client',
    component: 'create-client-page',
    action: async () => {
      await import('../pages/create-client/create-client-page.js');
    },
  },
  {
    path: '/countries',
    name: 'countries',
    component: 'countries-page',
    action: async () => {
      await import('../pages/countries/countries-page.js');
    },
  },
  {
    path: '/login',
    name: 'login',
    component: 'login-page',
    action: async () => {
      await import('../pages/login/login-page.js');
    },
  }
];
