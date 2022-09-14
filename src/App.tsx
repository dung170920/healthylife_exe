import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import { ErrorBoundary } from "components";
import Router from "router/Router";

function App() {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorBoundary}>
      <Router />
    </ReactErrorBoundary>
  );
}

export default App;
