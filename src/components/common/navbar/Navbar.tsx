import Link from 'next/link'
import React from 'react'
import Container from '../Container'

const NavData = [
  {
    href: '/about',
    label: 'About',
  },
  {
    href: '/contact',
    label: 'Contact',
  },
  {
    href: '/products',
    label: 'Products',
  },
  {
    href: '',
    label: 'About',
  }
]

const Logo = () => {
  return <div>
    <h1>ESSENTIA</h1>
  </div>
}

const NavLink: React.FC<{href: string, children: React.ReactNode}> = (props) => {
  
  return <li>
    <Link href={props.href}>
      {props.children}
    </Link>
  </li>
}

const NavLinks = () => {
  return <ul className='flex gap-x-10'>
    <NavLink href='/about'>
      About
    </NavLink>
    <NavLink href='/contact'>
      Contact
    </NavLink>
    <NavLink href='/products'>
      Products
    </NavLink>
    <NavLink href='/about'>
      <button>Login</button>
    </NavLink>
    
  </ul>
}

const Navbar = () => {
  return (
    <Container className='py-8 w-100 flex justify-between'>
      <Logo />
      <NavLinks />
    </Container>
  )
}



export default Navbar