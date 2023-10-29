import CottageIcon from '@mui/icons-material/Cottage';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { Func } from 'src/modules/@shared/domain/utils/func';
import { PATH_DASHBOARD } from "src/modules/dashboard/dashboard-paths";

export interface NavItem {
  title: string;
  path: string;
  icon?: JSX.Element;
  enabled?: boolean;
  children?: NavItem[];
}

const useNavConfig: Func<[], NavItem[]> = () => {
  return [
    {
      title: 'inicio',
      path: PATH_DASHBOARD.general.app,
      icon: <CottageIcon style={{ width: '22px' }} />
    },
  
    {
      title: 'Notas Fiscais',
      path: PATH_DASHBOARD.nfse.root,
      icon: <KeyboardIcon style={{ width: '22px' }} />,
      children: [
        { title: 'lista', path: PATH_DASHBOARD.nfse.list },
        //{ title: 'novo', path: PATH_DASHBOARD.nfse.create },
      ]
    },

    {
      title: 'Pagamentos',
      path: PATH_DASHBOARD.payment.root,
      icon: <KeyboardIcon style={{ width: '22px' }} />,
      children: [
        { title: 'lista', path: PATH_DASHBOARD.payment.list },
        { title: 'novo', path: PATH_DASHBOARD.payment.create },
      ]
    }
  ]
};

export default useNavConfig;