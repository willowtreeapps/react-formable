import React from 'react';
import routes from './routes';
import createHashHistory from 'history/lib/createHashHistory'
import { render } from 'react-dom';
import { Router } from 'react-router';

const history = createHashHistory({
    queryKey: false
});

render(
    <Router history={history}>
        {routes}
    </Router>,
    document.getElementById('app')
);
