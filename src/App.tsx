import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import { ErrorBoundary } from "components";
import Router from "router/Router";
import MUIThemeProvider from "theme/theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/vi";

function App() {
  return (
    <MUIThemeProvider>
      <ReactErrorBoundary FallbackComponent={ErrorBoundary}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"vi"}>
          <Router />
        </LocalizationProvider>
      </ReactErrorBoundary>
    </MUIThemeProvider>
  );
}

export default App;
