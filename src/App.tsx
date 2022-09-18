import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import { ErrorBoundary } from "components";
import Router from "router/Router";
import MUIThemeProvider from "theme/theme";

function App() {
  return (
    <MUIThemeProvider>
      <ReactErrorBoundary FallbackComponent={ErrorBoundary}>
        <Router />
      </ReactErrorBoundary>
    </MUIThemeProvider>
  );
}

export default App;
