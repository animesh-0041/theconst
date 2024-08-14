import { MainRouter } from "./routers/MainRouter.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { UserProvider } from "./Providers/UseContent.jsx";

// Create a QueryClient instance
const queryClient = new QueryClient();

// Polyfill for the global object
window.global ||= window;
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <MainRouter />
        {/* <ReactQueryDevtools initialIsOpen={false} position="left" /> */}
        </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
