import { createContext } from "react";
import { User } from "src/modules/default/domain/entities/user";
import { initialState } from "src/modules/default/providers/auth/auth-provider.types";
import type { AuthContextDesign } from "./auth-context.types";

export const AuthContext = createContext<AuthContextDesign>({
  ...initialState,
  login: (id: number, pass: string) => Promise.resolve(true),
  update(user: User) {},
  logout(){}
});

export default AuthContextDesign;