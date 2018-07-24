import Dashboard from './components/dashboard';

const routes = [
  {
    path: '/',
    pageName: 'dashboard',
    component: Dashboard,
    exact: true,
    navigation: true,
  },
];

export default routes;
