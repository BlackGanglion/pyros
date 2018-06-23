import * as React from 'react';
import { Route, IndexRedirect } from 'react-router';
import { Portal, SubPortal } from './pages';
import ReduxFrameLayout from './layouts/ReduxFrameLayout';

export default (
  <Route path="/" component={ReduxFrameLayout}>
    <IndexRedirect to="/portal" />
    <Route path="/portal" component={Portal} />
    <Route path="/subPortal" component={SubPortal} />
  </Route>
);
