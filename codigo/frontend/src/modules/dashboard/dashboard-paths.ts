import { path } from "src/modules/@shared/domain/utils/path";

export const ROOTS_DASHBOARD = '/dashboard';

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,

  general: {
    app: path(ROOTS_DASHBOARD, '/app')
  },

  nfse: {
    root: path(ROOTS_DASHBOARD, '/nfse'),
    list: path(ROOTS_DASHBOARD, '/nfse/list'),
    //create: path(ROOTS_DASHBOARD, '/nfse/create'),
    view: (id: number) => path(ROOTS_DASHBOARD, `/nfse/view/${id}`),
    //edit: (id: number) => path(ROOTS_DASHBOARD, `/nfse/edit/${id}`)
  },

  payment: {
    root: path(ROOTS_DASHBOARD, '/payment'),
    list: path(ROOTS_DASHBOARD, '/payment/list'),
    create: path(ROOTS_DASHBOARD, '/payment/create'),
    view: (id: number) => path(ROOTS_DASHBOARD, `/payment/view/${id}`),
    edit: (id: number) => path(ROOTS_DASHBOARD, `/payment/edit/${id}`)
  }
};