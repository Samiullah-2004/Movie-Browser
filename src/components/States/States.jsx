import './States.css';

export function LoadingGrid({ count = 8 }) {
  return (
    <div className="state-grid" aria-busy="true" aria-label="Loading movies">
      {Array.from({ length: count }).map((_, i) => (
        <div className="skeleton-card" key={i}>
          <div className="skeleton-card__media" />
          <div className="skeleton-card__line skeleton-card__line--title" />
          <div className="skeleton-card__line skeleton-card__line--sub" />
        </div>
      ))}
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="state-message" role="alert">
      <span className="state-message__icon">⚠️</span>
      <p>{message || 'Something went wrong. Please try again.'}</p>
      {onRetry && (
        <button className="state-message__retry" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

export function EmptyState({ icon = '🔍', title, message }) {
  return (
    <div className="state-message">
      <span className="state-message__icon">{icon}</span>
      {title && <p className="state-message__title">{title}</p>}
      {message && <p>{message}</p>}
    </div>
  );
}