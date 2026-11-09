import { StatusBar } from 'expo-status-bar';
import PilotGate from './src/components/PilotGate';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { LanguageProvider } from './src/contexts/LanguageContext';
import { AccountProvider } from './src/contexts/AccountContext';

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AccountProvider>
          <ErrorBoundary>
            <PilotGate />
            <StatusBar style="auto" />
          </ErrorBoundary>
        </AccountProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
