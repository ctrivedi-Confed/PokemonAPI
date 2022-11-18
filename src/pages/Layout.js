import React from 'react';
import HeaderCard from '../components/HeaderCard'

const Layout = () => {

    return (
        <div className="navBar">
            <HeaderCard link="/" title="1. Basic Information" />
            <HeaderCard link="/pokemon" title="2. Pokemon Selection" />
        </div>
    )
}

export default Layout