import logo from '../images/Logo-mesto.white.svg'

const Header = () => {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt='Логотип Место' />
        </header>);
}

export default Header;