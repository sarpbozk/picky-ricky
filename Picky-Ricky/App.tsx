import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MultiSelectAutocomplete } from './components/MultiSelectAutocomplete';
import { SafeAreaView } from 'react-native';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView>
        <MultiSelectAutocomplete />
      </SafeAreaView>
    </QueryClientProvider>
  );
}
