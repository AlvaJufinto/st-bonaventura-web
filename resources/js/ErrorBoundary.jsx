import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2 font-secondary">
            Oops, terjadi kesalahan!
          </h1>
          <p className="text-gray-700 mb-4 font-secondary">
            Segera hubungi developer.
          </p>
          {import.meta.env.DEV && (
            <pre className="bg-white p-4 rounded shadow text-left text-red-500 overflow-auto max-w-2xl">
              {this.state.error?.toString()}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
