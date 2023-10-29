import { User } from "src/modules/default/domain/entities/user";
import { Func } from "src/modules/@shared/domain/utils/func";

export interface AuthState {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: User | undefined;
}

export type AuthActionTypes = 'INITIALIZE' | 'LOGIN' | 'UPDATE' | 'LOGOUT';

export interface AuthAction {
  payload?: Partial<AuthState>;
  type: AuthActionTypes;
}

export type AuthReducer = Func<[AuthState, AuthAction], AuthState>;

export const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: undefined,
};