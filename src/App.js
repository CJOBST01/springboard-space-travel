import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar/Navbar';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AppProvider>
      <Navbar />
      <main>
        <AppRoutes />
      </main>
    </AppProvider>
  );
}

export default App;
