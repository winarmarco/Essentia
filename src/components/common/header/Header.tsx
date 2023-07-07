type HeaderProps = {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({children, className = ""}) => {
  return <header className={className}>
    {children}
  </header>
}

export default Header;