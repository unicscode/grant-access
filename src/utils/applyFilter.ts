import { Filters } from '../types';

const operatorsList = {
  _eq: true,
  _neq: true,
  _in: true,
  _nin: true,
  _not: true,
  _lt: true,
  _lte: true,
  _gt: true,
  _gte: true,
  _like: true,
  _ilike: true,
} as const;

function isObject(value: any): boolean {
  return typeof value === 'object' && !Array.isArray(value) && value !== null;
}

function applyFilter<T>(on: T, filter: Filters): boolean {
  if (!on) return false;

  if (Array.isArray(on)) {
    return !!on.filter(item => applyFilter(item, filter));
  } else if (typeof on === 'object') {
    const { where: { _and, _or, ...rest } = {}, ...restFilter } = filter;

    let match = true;
    if (_and) {
      for (const f of _and) {
        if (!applyFilter(on, { where: f, ...restFilter })) {
          match = false;
          break;
        }
      }
    }

    if (_or) {
      match = false;
      for (const f of _or) {
        if (applyFilter(on, { where: f, ...restFilter })) {
          match = true;
          break;
        }
      }
    }

    for (const key in rest) {
      const value = rest[key];
      if (isObject(value)) {
        if (!operatorsList[Object.keys(value)[0]]) {
          return applyFilter(on[key], { where: value });
        }
        const operator = Object.keys(value)[0];

        switch (operator) {
          case '_eq':
            if (on[key] !== value[operator]) return false;
            break;
          case '_neq':
            if (on[key] === value[operator]) return false;
            break;
          case '_in':
            if (!value[operator].includes(on[key])) return false;
            break;
          case '_nin':
            if (value[operator].includes(on[key])) return false;
            break;
          case '_lt':
            if (on[key] >= value[operator]) return false;
            break;
          case '_lte':
            if (on[key] > value[operator]) return false;
            break;
          case '_gt':
            if (on[key] <= value[operator]) return false;
            break;
          case '_gte':
            if (on[key] < value[operator]) return false;
            break;
          case '_like':
            if (!new RegExp(value[operator]).test(on[key])) return false;
            break;
          case '_ilike':
            if (!new RegExp(value[operator], 'i').test(on[key])) return false;
            break;
          case '_not':
            if (applyFilter(on, { where: value[operator] })) return false;
            break;
          default:
            throw new Error(`Unknown operator: ${operator}`);
        }
      } else {
        if (on[key] !== value) return false;
      }
    }
    return match;
  } else {
    throw new Error(`Data must be an array or an object`);
  }
}

export default applyFilter;
