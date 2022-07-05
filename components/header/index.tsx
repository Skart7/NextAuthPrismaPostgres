import React from 'react'

import HeaderLeft from './left'
import HeaderRight from './right'

import {Container} from '../../customUI'

import styles from '../../styles/header.module.sass'

export default function Header() {
  return (
    <header>
    <Container maxWidth="lg">
      <div className={styles.wrapper}>
        <HeaderLeft styles={styles} />
        <HeaderRight styles={styles} />
      </div>
    </Container>
  </header>
  )
}
