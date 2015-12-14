import React from 'react';
import routes from './routes';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { render } from 'react-dom';
import { Router } from 'react-router';

const history = createBrowserHistory();

render(
    <Router history={history}>
        {routes}
    </Router>,
    document.getElementById('app')
);
