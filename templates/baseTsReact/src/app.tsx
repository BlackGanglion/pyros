import * as React from 'react';
import { render } from 'react-dom';

class AppProps {
  name: string;
}

class App extends React.Component<AppProps, any> {
  render() {
    const { name } = this.props;
    return (
      <div>{name}</div>
    )
  }
}

render(<App name="pyros" />, document.getElementById('main'))

