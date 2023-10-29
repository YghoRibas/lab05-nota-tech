import { useContext } from 'react';
import { Func } from 'src/modules/@shared/domain/utils/func';
import { AuthContextDesign } from 'src/modules/default/contexts/auth/auth-context.types';
import { AuthContext } from 'src/modules/default/contexts/auth/auth-context';

const useAuth: Func<[], AuthContextDesign> = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('Auth context must be use inside AuthProvider');

  return context;
};

export default useAuth;
