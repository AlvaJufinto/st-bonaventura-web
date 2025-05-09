import "./bootstrap";
import "../css/app.css";

import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";

import { createInertiaApp } from "@inertiajs/react";

import ErrorBoundary from "./ErrorBoundary";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.jsx`,
      import.meta.glob("./Pages/**/*.jsx")
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <ErrorBoundary>
        <App {...props} />
      </ErrorBoundary>
    );
  },
  progress: {
    color: "#5783be",
  },
});
