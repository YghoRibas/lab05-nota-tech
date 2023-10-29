import { User } from "src/modules/default/domain/entities/user";
import { AuthState } from "src/modules/default/providers/auth/auth-provider.types";

export default interface AuthContextDesign extends AuthState {
  login(id: number, pass: string): Promise<boolean>;
  update(user: User): void;
  logout: () => void;
}

export type { AuthContextDesign };