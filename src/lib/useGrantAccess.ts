import { useEffect, useState } from 'react';
import { Filters } from '../types';
import { applyFilter } from '../utils';

function useGrantAccess(on: Record<string, any>, check: Filters) {
  const [hasAccess, setHasAccess] = useState(false);

  if (!on || !check) {
    throw new Error('both in and filters are required');
  }

  useEffect(() => {
    const access = applyFilter(on, check);
    setHasAccess(access);
  }, [on, check.where]);

  return { hasAccess };
}

export default useGrantAccess;
