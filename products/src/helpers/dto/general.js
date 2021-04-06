

export const headerData = (data) => data.headers;

export const bodyData = (data) => data.body;

export const paramsData = (data) => data.params;

export const queryData = (data) => data.query;

export const filterData = (data) => ({ where: data });

export const userData = (data) => data.user || {};
