import React, { Component }  from 'react';

export default class ReduxFrameLayout extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="redux-frame-layout">
        {children}
      </div>
    );
  }
}