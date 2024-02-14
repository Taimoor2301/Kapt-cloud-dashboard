// ** React Imports
import { createContext, use, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

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

        // await axios
        //   .get(authConfig.meEndpoint, {
        //     headers: {
        //       Authorization: storedToken
        //     }
        //   })
        //   .then(async response => {
        //     setLoading(false)
        //     setUser({ ...response.data.userData })
        //   })
        //   .catch(() => {
        //     localStorage.removeItem('userData')
        //     localStorage.removeItem('refreshToken')
        //     localStorage.removeItem('accessToken')
        //     setUser(null)
        //     setLoading(false)
        //     if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
        //       router.replace('/login')
        //     }
        //   })
        try {
          setUser(JSON.parse(localStorage.getItem('userData')));
          setUserPermissions(JSON.parse(localStorage.getItem('userPermissions')));
          setUserRoles(JSON.parse(localStorage.getItem('userRoles')));
          router.replace('/dashboards')
         } catch (error){
            if(error.response?.status === 401){
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              router.replace('/login');
            } else{
              console.log(error)
              toast.error('Something went wrong')
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
     localStorage.setItem('userData', JSON.stringify({...res.data.data.user, role:'admin'}));
     setUser({...res.data.data.user , role:'admin'});

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



      // .then(async response => {
      //   params.rememberMe
      //     ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
      //     : null
      //   const returnUrl = router.query.returnUrl
      //   setUser({ ...response.data.userData })
      //   params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.userData)) : null
      //   const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
      //   router.replace(redirectURL)
      // })
      // .catch(err => {
      //   if (errorCallback) errorCallback(err)
      // })
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
