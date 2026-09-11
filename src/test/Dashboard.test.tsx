import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { Dashboard } from '../features/dashboard/dashboardPage';
import { LiveFeedProvider } from '@/context/LiveFeedContext';


const mockSummaryData = {
  totalCalories: 500,
  calorieGoal: 2500,
  totalProtein: 40,
  totalCarbs: 60,
  totalFat: 20,
  timeline: [{ time: '12:00', calories: 500 }],
};

class MockEventSource {
  onmessage: ((event: { data: string }) => void) | null = null;
  onerror: (() => void) | null = null;
  close() {}
}

vi.stubGlobal('EventSource', MockEventSource);

describe('Dashboard Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('deve renderizar os totais de calorias e macronutrientes corretamente', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockSummaryData,
      })
    );

    render(
      <LiveFeedProvider>
        <Dashboard />
      </LiveFeedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('500 kcal')).toBeInTheDocument();
      expect(screen.getByText('Meta diária: 2500 kcal')).toBeInTheDocument();
      expect(screen.getByText('40g')).toBeInTheDocument();
      expect(screen.getByText('60g')).toBeInTheDocument();
      expect(screen.getByText('20g')).toBeInTheDocument();
    });
  });

  it('deve exibir mensagem de estado vazio no live feed inicialmente', () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockSummaryData,
      })
    );

    render(
      <LiveFeedProvider>
        <Dashboard />
      </LiveFeedProvider>
    );

    expect(screen.getByText('Aguardando ações no sistema...')).toBeInTheDocument();
  });
});