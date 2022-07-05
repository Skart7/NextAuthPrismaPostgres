import React from 'react'
import dynamic from 'next/dynamic'

const NextLink = dynamic(() => import("next/link"))
const ComputerRoundedIcon = dynamic(() => import("@mui/icons-material/ComputerRounded"))

import { Text } from '../../customUI'

export default function HeaderLeft({styles}) {
  return (
    <div className={styles.leftContent}>
        <NextLink href="/" passHref>
          <a style={{ display: 'flex', textDecoration: 'none' }}>
            <ComputerRoundedIcon fontSize="large" />
            <Text variant="h6" component="h1" pointer>NextPrismaPostgres</Text>
          </a>
        </NextLink>
    </div>
  )
}
