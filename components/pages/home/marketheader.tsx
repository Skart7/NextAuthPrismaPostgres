import React from 'react'

import { Input } from '../../../customUI'

export default function MarketHeader () {

    const [search, setSearch] = React.useState('')

    return (
    <div style={{ width: '33%' }}>
        <Input 
            variant="clear"
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Find product on this page..."
            type="search"
            name="search-product-on-this-page"
            fullWidth
            size="large"
        />
    </div>
    )
}