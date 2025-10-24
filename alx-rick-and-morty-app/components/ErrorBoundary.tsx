import React from 'react';
import * as Sentry from '@sentry/react';

interface State {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);

    Sentry.captureException(error, {
      extra: { componentStack: errorInfo.componentStack },
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            backgroundColor: '#0b0b0b',
            color: '#00ff99',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            fontFamily: "'Orbitron', sans-serif",
            padding: '2rem',
          }}
        >
          <img
            src="https://media.giphy.com/media/Uq5Jfi0bM4JgaN7Dqj/giphy.gif"
            alt="Rick and Morty glitch"
            style={{
              width: '500px',
              borderRadius: '12px',
              marginBottom: '1.5rem',
            }}
          />
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            Oops... something broke in the multiverse!
          </h2>
          <p style={{ maxWidth: '500px', marginBottom: '1.5rem' }}>
            Looks like Morty pressed the wrong button again. Don’t worry. You
            can try to reload and stabilize this dimension.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            style={{
              backgroundColor: '#00ff99',
              color: '#0b0b0b',
              padding: '0.8rem 1.5rem',
              fontSize: '1rem',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'transform 0.2s ease-in-out',
            }}
            onMouseOver={(e) =>
              ((e.target as HTMLButtonElement).style.transform = 'scale(1.05)')
            }
            onMouseOut={(e) =>
              ((e.target as HTMLButtonElement).style.transform = 'scale(1)')
            }
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
