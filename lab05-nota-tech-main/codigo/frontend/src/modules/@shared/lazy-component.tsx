import { JSXElementConstructor, LazyExoticComponent, ReactElement, Suspense, lazy } from "react";
import { useLocation } from "react-router-dom";
import LoadingScreen from "src/modules/default/components/progress/loading-screen";
import { Func } from "./domain/utils/func";

const Loadable = (Component: LazyExoticComponent<(p: any) => React.ReactElement>) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

type LCRetType = Promise<{ default: (p: any) => 
  ReactElement<any, string | JSXElementConstructor<any>>; }>

export const LazyComponent = (path: Func<[], LCRetType>) =>
  Loadable(lazy(path));