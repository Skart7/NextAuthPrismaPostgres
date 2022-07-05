import React from 'react'
import { Badge, IconButton, NoSsr, Text } from '../../customUI'
import dynamic from 'next/dynamic'

import {IconSkeleton} from '../skeleton'

const NextLink = dynamic(() => import("next/link"))
const LocalMallRoundedIcon = dynamic(() => import('@mui/icons-material/LocalMallRounded'), { loading: () => <IconSkeleton/> })
const AccountCircleRoundedIcon = dynamic(() => import('@mui/icons-material/AccountCircleRounded'), { loading: () => <IconSkeleton/> })
const SearchRoundedIcon = dynamic(() => import('@mui/icons-material/SearchRounded'), { loading: () => <IconSkeleton/> })
const LoginRoundedIcon = dynamic(() => import('@mui/icons-material/LoginRounded'), { loading: () => <IconSkeleton/> })
const LogoutRoundedIcon = dynamic(() => import('@mui/icons-material/LogoutRounded'), { loading: () => <IconSkeleton/> })

import {signOut} from 'next-auth/react'

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { selectCart } from '../../redux/slices/cart'
import { selectUser } from '../../redux/slices/user'
import { setModalCart, setModalSearch } from '../../redux/slices/modal'


export default function HeaderRight({styles}) {

  const dispatch = useAppDispatch()
  const cart = useAppSelector(selectCart)
  const user = useAppSelector(selectUser)

  const openCart = React.useCallback(() => {
    dispatch(setModalCart(true))
  }, [])
  const openSearch = React.useCallback(() => {
    dispatch(setModalSearch(true))
  }, [])

  return (
    <div className={styles.rightContent}>
        <div className={styles.iconWithText}>
        <IconButton onClick={openSearch}><SearchRoundedIcon/></IconButton>
        <Text variant="caption" className={styles.text}>Search</Text>
        </div>
        {
          !user.data.auth ? (
            <NextLink href="/sign" passHref>
              <div className={styles.iconWithText}>
                <IconButton><LoginRoundedIcon/></IconButton>
                <Text variant="caption" className={styles.text}>Log</Text>
              </div>
            </NextLink>
          ) : (
            <>
            <NextLink href="/account/orders" passHref>
              <div className={styles.iconWithText}>
                <IconButton><AccountCircleRoundedIcon/></IconButton>
                <Text variant="caption" className={styles.text}>Orders</Text>
              </div>
            </NextLink>
            <div className={styles.iconWithText}>
              <IconButton onClick={() => signOut()}><LogoutRoundedIcon/></IconButton>
              <Text variant="caption" className={styles.text}>SignOut</Text>
            </div>
            </>
          )
        }
        <NoSsr>
          <Badge value={cart.qty} max={9} color="secondary">
            <div className={styles.iconWithText}>
              <IconButton onClick={openCart}><LocalMallRoundedIcon/></IconButton>
              <Text variant="caption" className={styles.text}>Cart</Text>
            </div>
          </Badge>
        </NoSsr>
      </div>
  )
}
