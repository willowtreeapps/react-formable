import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Base from './controllers/base';
import Home from './controllers/home';
import Demo from './controllers/demo';
import Examples from './controllers/examples';
import Docs from './controllers/docs';
import GettingStarted from './controllers/getting-started';

export default (
	<Route path="/" component={Base}>
		<IndexRoute component={Home} />
		<Route path="home" component={Home} />
		<Route path="demo" component={Demo} />
		<Route path="examples" component={Examples} />
		<Route path="docs" component={Docs} />
		<Route path="getting-started" component={GettingStarted} />
	</Route>
);
