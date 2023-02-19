import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { GrantAccess } from '../src';

const App = () => {
  return (
    <div>
      <GrantAccess hasAccess={true}>
        <button type="button"> Delete </button>
      </GrantAccess>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
