import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LiveFeedProvider, useLiveFeed } from '@/context/LiveFeedContext';

class MockEventSource {
  onmessage: ((event: { data: string }) => void) | null = null;
  close = vi.fn();
}

let mockInstance: MockEventSource;
vi.stubGlobal('EventSource', class {
  constructor() {
    mockInstance = new MockEventSource();
    return mockInstance;
  }
});

describe('LiveFeedContext', () => {
  it('deve adicionar novos eventos ao estado global via SSE', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <LiveFeedProvider>{children}</LiveFeedProvider>
    );

    const { result } = renderHook(() => useLiveFeed(), { wrapper });

    expect(result.current.liveFeed).toHaveLength(0);

    act(() => {
      mockInstance.onmessage?.({
        data: JSON.stringify({ id: '123', timestamp: new Date().toISOString(), type: 'TREINO', message: 'Treino concluído' }),
      });
    });

    expect(result.current.liveFeed).toHaveLength(1);
    expect(result.current.liveFeed[0].type).toBe('TREINO');
  });
});