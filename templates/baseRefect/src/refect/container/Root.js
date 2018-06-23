import { persistState } from 'redux-devtools';
import { routerMiddleware, routerReducer, syncHistoryWithStore } from 'react-router-redux';
import { combineReducers } from 'redux';
import { browserHistory, Router } from 'react-router';
import { refectRoot } from 'react-refect';
import React from 'react';
import useScroll from 'scroll-behavior/lib/useScrollToTop';

import DevTools from './DevTools';

// 引入 store
import { PortalStore } from '../../pages/Portal';
import { SubPortalStore } from '../../pages/SubPortal';
import { RepoPickerStore } from '../../components/RepoPicker';
import { UserPickerStore } from '../../components/UserPicker';

function getDebugSessionKey() {
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  return (matches && matches.length > 0) ? matches[1] : null;
}

const getBrowserHistory = () => {
  return browserHistory;
};

let history = useScroll(getBrowserHistory)({
  shouldUpdateScroll: (oldLoc, newLoc) => {
    // query 改变时不滚动
    return !oldLoc || oldLoc.pathname !== newLoc.pathname;
  },
});

const initReducers = combineReducers({
  routing: routerReducer,
});

const initialState = {};
const devTool = window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument();

let enhancers = [];

if (__DEV__) {
  enhancers = [devTool, persistState(getDebugSessionKey())];
}

const Root = refectRoot({
  initialState,
  initReducers,
  storeAll: [PortalStore, SubPortalStore, RepoPickerStore, UserPickerStore],
  middlewares: [routerMiddleware(history)],
  enhancers,
  storeCreated(store) {
    history = syncHistoryWithStore(history, store);
  },
});

function ReduxRootContainer(props) {
  const { routes } = props;
  return (
    <Root>
      {
        __DEV__ ? (
          <div>
            <Router history={history}>
              {routes}
            </Router>
            {!window.devToolsExtension ? <DevTools /> : null}
          </div>
        ) : (
          <Router history={history}>
            {routes}
          </Router>
        )
      }
    </Root>
  );
}

export default ReduxRootContainer;
