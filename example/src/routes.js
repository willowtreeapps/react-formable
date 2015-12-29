import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Base from './controllers/base';
import Home from './controllers/home/home';
import Examples from './controllers/examples/examples';
import API from './controllers/api/api';
import GettingStarted from './controllers/getting-started/getting-started';

export default (
	<Route path="/" component={Base}>
		<IndexRoute component={Home} />
		<Route path="home" component={Home} />
		<Route path="examples" component={Examples} />
		<Route path="api" component={API} />
		<Route path="getting-started" component={GettingStarted} />
	</Route>
);
