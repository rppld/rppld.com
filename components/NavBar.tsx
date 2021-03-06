import * as React from 'react'

const NavBar: React.FunctionComponent = ({ children }) => (
  <nav>
    {children}

    <style jsx>{`
      nav {
        font-size: var(--fs-16);
        width: 100%;
        pointer-events: none;
      }
    `}</style>
  </nav>
)

export default NavBar
