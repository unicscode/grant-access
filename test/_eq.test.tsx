// @ts-nocheck
import { applyFilter } from '../src';

describe('_eq operator', () => {
  const user = {
    id: 1,
    name: 'doe',
    isAdmin: true,
    privilieges: null,
    roles: {
      isAdmin: false,
    },
  };

  it('should check equality with number value', () => {
    expect(applyFilter(user, { where: { id: { _eq: 1 } } })).toBeTruthy();
  });
  it('should check equality with string value', () => {
    expect(applyFilter(user, { where: { name: { _eq: 'doe' } } })).toBeTruthy();
  });
  it('should check equality with boolean value', () => {
    expect(
      applyFilter(user, { where: { isAdmin: { _eq: true } } })
    ).toBeTruthy();
  });
  it('should check equality with null value', () => {
    expect(
      applyFilter(user, { where: { privilieges: { _eq: null } } })
    ).toBeTruthy();
  });
  it('should work with nested value', () => {
    expect(
      applyFilter(user, {
        where: {
          roles: { isAdmin: { _eq: false } },
        },
      })
    ).toBeTruthy();
  });
});
