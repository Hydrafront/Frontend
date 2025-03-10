import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ChartErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Chart Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-full bg-gray-900 text-white">
          <div className="text-center">
            <h2 className="text-xl mb-2">Chart failed to load</h2>
            <p className="text-gray-400">{this.state.error?.message}</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ChartErrorBoundary; 