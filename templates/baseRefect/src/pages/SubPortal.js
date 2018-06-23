import React, { Component } from 'react';
import refect from 'react-refect';

const initialState = {
};

function reducer(state, manager) {
  return {
  }
}

function tasks(actions, effects) {
  return {
  };
}

class SubPortal extends Component {
  render() {
    return (
      <div className="sub-portal">
      </div>
    );
  }
}

const namespace = 'subPortal';

export const SubPortalStore = {
  initialState,
  reducer,
  tasks,
  namespace,
}

export default refect({
  view: SubPortal,
  namespace,
});