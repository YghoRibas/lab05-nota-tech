import { Navigate } from 'react-router-dom';
import { PATH_DEFAULT } from 'src/modules/default/default-paths';
import useAuth from 'src/modules/default/hooks/use-auth';

export interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    //return <Navigate to={PATH_DEFAULT.auth} />;
  }

  return <>{children}</>;
}