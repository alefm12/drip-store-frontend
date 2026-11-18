import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import Logo from '../Logo/Logo';
import miniCart from '../../assets/mini-cart.svg';
import './Header.css';

const NAV_LINKS = [
  { text: 'Home', to: '/' },
  { text: 'Produtos', to: '/products' },
  { text: 'Categorias', to: '/categorias' },
  { text: 'Meus Pedidos', to: '/meus-pedidos' },
];

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default function Header() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [term, setTerm] = useState(searchParams.get('filter') || '');
  const [menuOpen, setMenuOpen] = useState(false);

  // mantém o campo sincronizado ao navegar
  useEffect(() => setTerm(searchParams.get('filter') || ''), [searchParams]);

  // busca ao clicar na lupa ou pressionar Enter -> /products?filter=termo
  const handleSearch = (event) => {
    event.preventDefault();
    const value = term.trim();
    navigate(value ? `/products?filter=${encodeURIComponent(value)}` : '/products');
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container header__top">
        <button
          type="button"
          className="header__menu-btn"
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <Logo />

        <form className="header__search" role="search" onSubmit={handleSearch}>
          <label htmlFor="search" className="visually-hidden">
            Pesquisar produto
          </label>
          <input
            id="search"
            type="search"
            placeholder="Pesquisar produto..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
          <button type="submit" aria-label="Pesquisar">
            <SearchIcon />
          </button>
        </form>

        <div className="header__actions">
          <Link to="/cadastro" className="header__signup">
            Cadastre-se
          </Link>
          <Link to="/login" className="header__login">
            Entrar
          </Link>
        </div>

        <span className="header__cart" aria-label="Carrinho com 2 itens">
          <img src={miniCart} alt="" width={24} height={24} />
          <span className="header__cart-badge">2</span>
        </span>
      </div>

      <nav className={`container header__nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navegação principal">
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) => `header__link ${isActive ? 'is-active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {link.text}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
