# grant-access

This React authorization library is designed to work with React, providing a filtering style that allows for fine-grained control over user permissions. The library provides a GrantAccess component that can be used to check if a user is authorized to see a component or not, based on a specified policy. The library is built to be easy to use and highly customizable, making it a great choice for projects of all sizes.

## Installation

To install the library, simply run the following command in your project directory:

```shell
npm install react-grant-access --save
```

## Basic Example

```typescript
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
```
