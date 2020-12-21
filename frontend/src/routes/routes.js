import Error404 from './404';
import Home from './home';
import Projects from './projects';
import Posts from './posts';
import About from './about';
import Contact from './contact';

const routes = [
  {
    path: '/home',
    exact: true,
    component: Home,
  },
  {
    path: '/projects',
    component: Projects,
    routes: [{ path: '/projects/:id' }],
  },
  {
    path: '/posts',
    component: Posts,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/contact',
    component: Contact,
  },
  {
    path: '*',
    component: Error404,
  },
];

export default routes;
