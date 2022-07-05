import PropTypes from 'prop-types'
import { wrapper } from '../redux/store'
import { getSession, SessionProvider } from 'next-auth/react'

import {setUser} from '../redux/slices/user'

import '../styles/global.sass'

function App({ Component, pageProps, session }) {
  
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}

App.getInitialProps = wrapper.getInitialAppProps(store => async ({ctx, Component}) => {  

  const session:any = await getSession(ctx)    

  if(session && session.user) {
    store.dispatch(setUser({
      id: session.user.sub,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      accessToken: session.accessToken, 
      auth: true
    }))
  }

  return {
    session: session,
    pageProps: Component.getInitialProps ? await Component.getInitialProps({...ctx, store}) : {},
  }

})


export default wrapper.withRedux(App)