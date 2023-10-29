import { useEffect, useReducer } from "react";
import { AuthContext } from "src/modules/default/contexts/auth/auth-context";
import { User } from "src/modules/default/domain/entities/user";
import { isValidToken, setSession } from "src/modules/@shared/domain/utils/session/jwt";
import { AuthAction, AuthActionTypes, AuthReducer, AuthState, initialState } from "./auth-provider.types";

const handlers: Record<AuthActionTypes, AuthReducer> = {
  INITIALIZE: (state: AuthState, { payload }: AuthAction) => {
    const { isAuthenticated, user } = payload ?? {}

    return {
      ...state,
      isAuthenticated: isAuthenticated ?? false,
      isInitialized: true,
      user
    }
  },
  LOGIN: (state: AuthState, { payload }: AuthAction) => {
    const { user } = payload ?? {}

    return {
      ...state,
      isAuthenticated: true,
      user,
    }
  },
  UPDATE: (state: AuthState, { payload }: AuthAction) => {
    const { user } = payload ?? {}

    return {
      ...state,
      user,
    }
  },
  LOGOUT: (state: AuthState) => ({
    ...state,
    isAuthenticated: false,
    user: undefined,
  })
};

const reducer = (state: AuthState, action: AuthAction) => 
  (handlers[action.type] ? handlers[action.type](state, action) : state);
  
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          // const response = await axios.get('/user');

          // const { data: user } = response;

          const user = JSON.parse(localStorage.getItem('user') as string)

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: undefined,
            },
          });
        }
      } catch (err) {
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: undefined,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (id: number, password: string): Promise<boolean> => {
    setSession(undefined);
    
    dispatch({
      type: 'LOGIN',
      payload: {
        user: {
          id,
          username: String(id),
          password
        }
      },
    })

    return false;
  };

  const update = async({ username, password }: User) => {
  }

  const logout = () => {
    setSession(undefined);
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        update,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;