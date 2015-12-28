import React from 'react';
import routes from './routes';
import { render } from 'react-dom';
import { Router } from 'react-router';

// default router history is hash based
render(
    <Router>
        {routes}
    </Router>,
    document.getElementById('app')
);
