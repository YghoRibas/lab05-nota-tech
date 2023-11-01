import { Navigate, useRoutes } from 'react-router-dom';
import GuestGuard from 'src/modules/@shared/guards/guest-guard';
import { LazyComponent } from 'src/modules/@shared/lazy-component';
import dashboardModule from 'src/modules/dashboard/dashboard-module';

export default function Router() {
  return useRoutes([
    // Auth Route
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        }
      ],
    },

    dashboardModule,

    // Main Routes
    { path: '*', element: <Navigate to="/dashboard/app" replace /> },
  ]);
}

const LoginPage = LazyComponent(() => import("src/modules/default/pages/login-page"))
