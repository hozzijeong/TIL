import { navigate } from '../utility/navigate.js';
import { pathToRegex } from '../utility/validation.js';
import Home from './Home.js';
import NotFound from './NotFound.js';
import Settings from './Settings.js';

export default function App({ $app }) {
  const homePage = new Home({ $app, initialState: 'Home' });
  const settings = new Settings({ $app, initialState: 'Settings' });
  const notFound = new NotFound({ $app });

  const routes = [
    { path: '/', view: homePage, title: 'Home' },
    { path: '/settings', view: settings, title: 'Settings' },
  ];

  this.render = () => {
    const results = routes.map((route) => {
      return {
        route,
        result: location.pathname.match(pathToRegex(route.path)),
      };
    });
    let match = results.find((route) => route.result !== null);

    if (!match) notFound.init();
    else match.route.view.init();
  };

  this.init = () => {
    window.addEventListener('popstate', () => {
      this.render();
    });

    window.addEventListener('DOMContentLoaded', () => {
      document.body.addEventListener('click', (e) => {
        if (e.target.matches('[data-link]')) {
          e.preventDefault();
          const BASE_URL = 'http://127.0.0.1:5500';
          const targetURL = e.target.href.replace(BASE_URL, '');
          navigate(targetURL, e.target.dataset.link);
        }
      });

      this.render();
    });
    window.addEventListener('historychange', ({ detail }) => {
      const { to, isReplace, state } = detail;
      if (isReplace || to === location.pathname)
        history.replaceState(state, '', to);
      else history.pushState(state, '', to);

      this.render();
    });
  };
  this.init();
}
