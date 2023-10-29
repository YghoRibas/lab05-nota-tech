import { Navigate } from 'react-router-dom';
import { PATH_DASHBOARD } from 'src/modules/dashboard/dashboard-paths';
import useAuth from 'src/modules/default/hooks/use-auth';

export interface GuestGuardProps {
  children: React.ReactNode;
}

export default function GuestGuard({ children }: GuestGuardProps) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={PATH_DASHBOARD.root} />;
  }

  return <>{children}</>;
}