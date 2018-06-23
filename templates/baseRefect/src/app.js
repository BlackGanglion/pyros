import './styles/app.scss';

import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import routes from './routes';
import ReduxRootContainer from './refect/container/Root';

render(<ReduxRootContainer routes={routes} />, document.getElementById('main'));
