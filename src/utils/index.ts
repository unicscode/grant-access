interface Where {
  _and?: Where[];
  _or?: Where[];
  _not?: Where;
  [column: string]: {
    _eq?: any;
    _neq?: any;
    _in?: any[];
    _nin?: any[];
    _not?: any;
    _lt?: any;
    _lte?: any;
    _gt?: any;
    _gte?: any;
    _is_null?: boolean;
    _like?: string;
    _ilike?: string;
    _similar?: string;
    _regexp?: string;
    _iregexp?: string;
  };
}

interface Filters {
  where: Where;
}

const operatorsList = {
  _eq: true,
  _neq: true,
  _in: true,
  _nin: true,
  _lt: true,
  _lte: true,
  _gt: true,
  _gte: true,
  _like: true,
  _ilike: true,
  _not: true,
} as const;

function isObject(value: any): boolean {
  return typeof value === 'object' && !Array.isArray(value) && value !== null;
}

function applyFilter<T>(data: T, filter: Filters): boolean {
  if (!data) return false;

  if (Array.isArray(data)) {
    return !!data.filter(item => applyFilter(item, filter));
  } else if (typeof data === 'object') {
    const { where: { _and, _or, ...rest } = {}, ...restFilter } = filter;

    let match = true;
    if (_and) {
      for (const f of _and) {
        if (!applyFilter(data, { where: f, ...restFilter })) {
          match = false;
          break;
        }
      }
    }

    if (_or) {
      match = false;
      for (const f of _or) {
        if (applyFilter(data, { where: f, ...restFilter })) {
          match = true;
          break;
        }
      }
    }

    for (const key in rest) {
      const value = rest[key];
      if (isObject(value)) {
        if (!operatorsList[Object.keys(value)[0]]) {
          return applyFilter(data[key], { where: value });
        }
        const operator = Object.keys(value)[0];

        switch (operator) {
          case '_eq':
            if (data[key] !== value[operator]) return false;
            break;
          case '_neq':
            if (data[key] === value[operator]) return false;
            break;
          case '_in':
            if (!value[operator].includes(data[key])) return false;
            break;
          case '_nin':
            if (value[operator].includes(data[key])) return false;
            break;
          case '_lt':
            if (data[key] >= value[operator]) return false;
            break;
          case '_lte':
            if (data[key] > value[operator]) return false;
            break;
          case '_gt':
            if (data[key] <= value[operator]) return false;
            break;
          case '_gte':
            if (data[key] < value[operator]) return false;
            break;
          case '_like':
            if (!new RegExp(value[operator]).test(data[key])) return false;
            break;
          case '_ilike':
            if (!new RegExp(value[operator], 'i').test(data[key])) return false;
            break;
          case '_not':
            if (applyFilter(data, { where: value[operator] })) return false;
            break;
          default:
            throw new Error(`Unknown operator: ${operator}`);
        }
      } else {
        if (data[key] !== value) return false;
      }
    }
    return match;
  } else {
    throw new Error(`Data must be an array or an object`);
  }
}
