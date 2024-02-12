// ** React Imports
import { createContext, use, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'
import api from 'src/hooks/useApi'

// ** Config
import authConfig from 'src/configs/auth'
import { baseURL } from 'src/Constants/Constants'
import toast from 'react-hot-toast'
import permissions from 'src/store/apps/permissions'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user);
  const [userPermissions , setUserPermissions] = useState([]);
  const [userRoles , setUserRoles] = useState([])
  const [loading, setLoading] = useState(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = window.localStorage.getItem('accessToken')
      if (storedToken) {
        setLoading(true)
        try {
          // const res = await api.get(`/users/users.getuserdetailsbyidasync`, { params: { id:JSON.parse(localStorage.getItem('userData')).id } });
          const res = await api.get(`/personal/personal.getcurrentuserdetailasync`);

          // console.log(res2.data,'from res 2')
          // console.log(res.data,'from res 1')
          setUser({...res.data, role:'admin'});
          setUserPermissions(JSON.parse(localStorage.getItem('userPermissions')));
          setUserRoles(JSON.parse(localStorage.getItem('userRoles')));

         } catch (error){
            if(error.response?.status === 401){
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              router.replace('/login');
            } else{
              console.log(error)
              toast.error('Something went wrong');
              router.replace('/login');
            }
         } finally{
          setLoading(false)
         }
      } else {
        setLoading(false)
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = async (params, errorCallback) => {
    const {email , password} = params;
    try {
     const res = await axios.post(`${baseURL + "/tokens/token.gettokenasync"}`,
      {email , password},
      {
       headers:{
       'Content-Type': 'application/json',
        accept: 'application/json',
        tenant: 'root'
     }});

     localStorage.setItem('accessToken',res.data.data.token.token);
     localStorage.setItem('refreshToken',res.data.data.token.refreshToken);
     localStorage.setItem('userPermissions',JSON.stringify(res.data.data.permissions) );
     localStorage.setItem('userRoles',JSON.stringify(res.data.data.roles));
     localStorage.setItem('userData', JSON.stringify({...res.data.data.user, role:res.data.data.roles[0].toLowerCase()}));
     setUser({...res.data.data.user , role:res.data.data.roles[0].toLowerCase()});

     const returnUrl = router.query.returnUrl
     const redirectURL = returnUrl && returnUrl !== '/dashboards' ? returnUrl : '/dashboards'
     router.replace(redirectURL)

    } catch (error) {
      console.log(error)
      if(error.response?.status === 401){
        errorCallback()
      } else{
        toast.error('Something went wrong')
      }
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear();

    // window.localStorage.removeItem('accessToken');
    // window.localStorage.removeItem('refreshToken');
    // window.localStorage.removeItem('userData');
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    userPermissions,
    userRoles
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
