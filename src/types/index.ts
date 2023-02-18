export interface Where {
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
    // _similar?: string;
    // _regexp?: string;
    // _iregexp?: string;
  };
}

export interface Filters {
  where: Where;
}
