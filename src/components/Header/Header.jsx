import { Link, NavLink } from 'react-router-dom';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import './Header.css';

export function Header({ query, onQueryChange, theme, onToggleTheme }) {
  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__brand">
          🎬 MovieBrowser
        </Link>

        <div className="header__search">
          <Input
            type="search"
            placeholder="Search movies…"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            icon="🔍"
            aria-label="Search movies"
          />
        </div>

        <nav className="header__nav">
          <NavLink to="/" className="header__link" end>
            Browse
          </NavLink>
          <NavLink to="/favorites" className="header__link">
            Favorites
          </NavLink>
        </nav>

        <Button
          variant="icon"
          onClick={onToggleTheme}
          aria-label="Toggle dark mode"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </Button>
      </div>
    </header>
  );
}