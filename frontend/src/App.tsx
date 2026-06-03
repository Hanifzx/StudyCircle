import { AuthProvider } from './context/AuthContext';
import { AppRouter } from './router/AppRouter';
import { ReloadPrompt } from './components/common/ReloadPrompt';

function App() {
  return (
    <AuthProvider>
      <AppRouter />
      <ReloadPrompt />
    </AuthProvider>
  );
}

export default App;
