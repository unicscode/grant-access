import React, { PropsWithChildren } from 'react';

interface Props {
  hasAccess: boolean;
  otherwiseRender?: React.ReactElement;
}

export default function GrantAccess({
  hasAccess,
  otherwiseRender,
  children,
}: PropsWithChildren<Props>) {
  if (hasAccess) {
    return <>{children}</>;
  }

  if (!hasAccess && otherwiseRender) {
    return otherwiseRender;
  }

  return null;
}
