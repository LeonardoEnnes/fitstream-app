import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { WorkoutsPage } from '@/features/workout/WorkoutsPage';

const mockWorkouts = [
  { id: '1', exercise: 'Supino Reto', sets: 4, reps: 10, weight: 80, completed: false },
];

describe('WorkoutsPage Component', () => {
  it('deve listar os treinos e permitir marcá-los como concluídos', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url) => {
        if (url.includes('/workouts')) {
          return Promise.resolve({
            ok: true,
            json: async () => mockWorkouts,
          });
        }
        return Promise.resolve({
          ok: true,
          json: async () => ({ id: '1', completed: true }),
        });
      })
    );

    render(<WorkoutsPage />);

    await waitFor(() => {
      expect(screen.getByText('Supino Reto')).toBeInTheDocument();
    });

    const completeButton = screen.getByRole('button', { name: /Concluir/i });
    fireEvent.click(completeButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/workouts/1/complete'),
        expect.objectContaining({ method: 'PATCH' })
      );
    });
  });
});