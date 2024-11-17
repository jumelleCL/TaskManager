import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import UserProvider from "./context/UserProvider";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="flex flex-col min-h-screen w-screen">
      <UserProvider>
      <Header />
        <main className="flex-grow flex items-center justify-center w-full overflow-hidden">
          <AppRoutes />
        </main>
      </UserProvider>
      <Footer />
    </div>
  );
}

export default App
