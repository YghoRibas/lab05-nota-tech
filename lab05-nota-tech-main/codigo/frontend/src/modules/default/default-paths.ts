import { path } from "src/modules/@shared/domain/utils/path";

export const ROOTS_DEFAULT = '';

export const PATH_DEFAULT = {
  root: ROOTS_DEFAULT,
  auth: path(ROOTS_DEFAULT, '/auth/login')
};