import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { applyFilter, GrantAccess } from '../src';

const App = () => {
  const user = {
    id: 1,
    roles: ['editor', 'admin'],
  };
  return <PirvateComponent user={user} />;
};

const AccessDenied = () => {
  return <h1>Access denied</h1>;
};
const policy = { where: { id: { _eq: 2 } } };

const PirvateComponent = ({
  user,
}: React.PropsWithoutRef<{ user: { id: number; roles: string[] } }>) => {
  const hasAccess = React.useMemo(() => {
    return applyFilter(user, policy);
  }, [user.id]);

  return (
    <div>
      <GrantAccess hasAccess={hasAccess} otherwiseRender={<AccessDenied />}>
        <button type="button"> Delete </button>
      </GrantAccess>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
