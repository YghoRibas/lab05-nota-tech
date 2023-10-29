export const prepare = {
  queryParams: (params: any) => {
    const pagination = {
      //orderBy: params.order,
      //sortBy: params.orderBy,
      order: null,
      orderBy: null,
      sortBy: null
    }

    return { ...params, ...pagination }
  },

  clearEmpty: (params: any) => {
    for(const key in params)
    {
      if(typeof params[key] == 'object')
        prepare.clearEmpty(params[key])

      if(!params[key])
        delete params[key]
    }

    return params;
  },

  all: (params: any) => {
    const callbacks = [prepare.queryParams, prepare.clearEmpty]

    return callbacks
      .reduce((accu, current) => current(accu), params)
  }
}