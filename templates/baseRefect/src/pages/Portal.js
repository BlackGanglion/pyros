import React, { Component } from 'react';
import refect from 'react-refect';

import UserPicker from '../components/UserPicker';
import RepoPicker from '../components/RepoPicker';

const initialState = {
};

function reducer(state, manager) {
  return {
  }
}

function tasks(actions, effects) {
  return {
    mount(props) {
      const { allActions } = props;
      const { userPicker, repoPicker } = allActions;
      effects.watch(userPicker.selectUser, (userId) => {
        repoPicker.changeUserId(userId);
      });
    },
  };
}

function renderRepo(repo) {
  if (!repo) {
    return null;
  }

  return (
    <div>
      <div className="item">name: {repo.name}</div>
      <div className="item">size: {repo.size}</div>
      <div className="item">stargazers_count: {repo.stargazers_count}</div>
    </div>
  );
}

class Portal extends Component {
  render() {
    const { userPicker, repoPicker } = this.props;
    const selectedRepo = repoPicker && repoPicker.selectedRepo;
    const selectedUser = userPicker && userPicker.selectedUser;

    console.log('portal');

    return (
      <div>
        <UserPicker />
        <RepoPicker />
        <div className="detail">
          repo detail:
          {renderRepo(selectedRepo)}
        </div>
      </div>
    );
  }
}

const namespace = 'portal';

export const PortalStore = {
  initialState,
  reducer,
  tasks,
  namespace,
}

export default refect({
  view: Portal,
  namespace,
  mapStateToProps: (storeState, props, storeAllState) => {
    const { userPicker, repoPicker } = storeAllState;
    return {
      ...storeState,
      userPicker,
      repoPicker,
    }
  }
});
