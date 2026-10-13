"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/Button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 text-center p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">⚠️</span>
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-ink dark:text-white">
                Something went wrong
              </h2>
              <p className="text-sm text-muted">
                {this.state.error?.message || "An unexpected error occurred"}
              </p>
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={() => this.setState({ hasError: false })}
            >
              Try Again
            </Button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}