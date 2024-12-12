// import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import UserProvider from "./context/UserProvider";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="flex flex-col min-h-screen w-screen">
      <UserProvider>
        <Header />
        <main className="min-h-full flex items-start justify-center w-full">
          <AppRoutes />
        </main>
      </UserProvider>
    </div>
  );
}

export default App;
