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
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-green-400 text-center font-mono px-6">
          <img
            src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExanVtMWFubzR5djJ3MzV0OXhjZnlyenk2ZzNhNjkwZjN0Z2wwNjQ4ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vFtGDTXTNr4Z3uG4St/giphy.gif"
            alt="Rick and Morty glitch"
            className="w-100 rounded-xl mb-6 shadow-[0_0_25px_#00ff99]"
          />
          <h2 className="text-3xl font-bold mb-3">
            Oops... something broke in the multiverse!
          </h2>
          <p className="max-w-lg mb-6 text-green-300">
            Looks like Morty pressed the wrong button again. Don’t worry. You
            can try reloading and stabilize this dimension.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="bg-green-400 text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transform transition-all duration-200 shadow-[0_0_20px_#00ff99]"
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
