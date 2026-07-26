import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('AstroYantra render error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="page">
          <div className="container" style={{ textAlign: 'center', padding: '4rem 1.5rem' }}>
            <div className="eyebrow">Something went wrong</div>
            <h1 style={{ fontSize: '2rem', marginTop: '0.6rem' }}>The stars are misaligned.</h1>
            <p className="muted" style={{ maxWidth: '46ch', margin: '1rem auto 2rem' }}>
              An unexpected error occurred. Try refreshing the page — if it keeps happening,
              please let us know via the Contact page.
            </p>
            <button className="btn-primary" onClick={() => window.location.reload()}>
              Refresh
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
