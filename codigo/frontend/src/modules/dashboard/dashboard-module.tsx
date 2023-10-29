import { Navigate, NonIndexRouteObject } from "react-router-dom";
import { PATH_AFTER_LOGIN } from "src/config";
import AuthGuard from "src/modules/@shared/guards/auth-guard";
import { LazyComponent } from "src/modules/@shared/lazy-component";

const DashboardIndex = LazyComponent(() => import("./components/index"))

const NfseListPage = LazyComponent(() => import("./pages/nfse/nfse-list"))
//const NfseEditAddPage = LazyComponent(() => import("./pages/nfse/nfse-edit-add"))
const NfseViewPage = LazyComponent(() => import("./pages/nfse/nfse-view"))

const PaymentListPage = LazyComponent(() => import("./pages/payment/payment-list"))
const PaymentEditAddPage = LazyComponent(() => import("./pages/payment/payment-edit-add"))
const PaymentViewPage = LazyComponent(() => import("./pages/payment/payment-view"))

const dashboardModule: NonIndexRouteObject = {
  path: 'dashboard',
  element: (
    <AuthGuard>
      <DashboardIndex />
    </AuthGuard>
  ),
  children: [
    { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },

    {
      path: 'nfse',
      children: [
        { element: <Navigate to="/dashboard/nfse/list" replace />, index: true },
        { path: 'list', element: <NfseListPage /> },
        //{ path: 'create', element: <NfseEditAddPage /> },
        //{ path: 'edit/:id', element: <NfseEditAddPage /> },
        { path: 'view/:id', element: <NfseViewPage /> },
      ]
    },

    {
      path: 'payment',
      children: [
        { element: <Navigate to="/dashboard/payment/list" replace />, index: true },
        { path: 'list', element: <PaymentListPage /> },
        { path: 'create', element: <PaymentEditAddPage /> },
        { path: 'edit/:id', element: <PaymentEditAddPage /> },
        { path: 'view/:id', element: <PaymentViewPage /> },
      ]
    },

    { path: 'app', element: <></> }
  ],
}

export default dashboardModule;