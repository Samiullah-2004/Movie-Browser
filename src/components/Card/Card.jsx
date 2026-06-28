import './Card.css';

export function Card({ children, onClick, className = '', as = 'div' }) {
  const Tag = as;
  const interactive = typeof onClick === 'function';

  return (
    <Tag
      className={`card ${interactive ? 'card--interactive' : ''} ${className}`}
      onClick={onClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick(e);
              }
            }
          : undefined
      }
    >
      {children}
    </Tag>
  );
}

Card.Media = function CardMedia({ src, alt, fallback }) {
  return (
    <div className="card__media">
      {src ? (
        <img src={src} alt={alt} loading="lazy" />
      ) : (
        <div className="card__media-fallback">{fallback || '🎬'}</div>
      )}
    </div>
  );
};

Card.Body = function CardBody({ children }) {
  return <div className="card__body">{children}</div>;
};