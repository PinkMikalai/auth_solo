function Header() {
    return(
        <header>
            <h1>Ici mon header</h1>
            <ul>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/my-infos">Genere des infos</Link></li>
            </ul>
        </header>
    )
}
export default Header;  