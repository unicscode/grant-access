interface BaseFilter {
  [column: string]: {
    _eq?: any;
    _neq?: any;
    _in?: any[];
    _nin?: any[];
    _lt?: any;
    _lte?: any;
    _gt?: any;
    _gte?: any;
    _is_null?: boolean;
    _like?: string;
    _ilike?: string;
  };
}

type And = {
  _and: BaseFilter[];
};
type Or = {
  _or: BaseFilter[];
};

type Not = {
  _not: BaseFilter | And | Or;
};

export interface Filters {
  where: BaseFilter | And | Or | Not;
}
