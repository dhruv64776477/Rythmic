import { render, screen } from '@testing-library/react';
import App from './App';
import { fetchAudioCatalog } from './services/audioApi';

jest.mock('./services/audioApi', () => ({
  fetchAudioCatalog: jest.fn(),
}));

test('renders tracks loaded from the audio API on Explore', async () => {
  fetchAudioCatalog.mockResolvedValue([
    {
      id: 'audio-1',
      position: '01',
      title: 'API Sample Track',
      artist: 'Sample Artist',
      duration: 180,
      durationLabel: '3:00',
      image: '/image.png',
      path: '/audio/1.mp3',
    },
  ]);

  render(<App />);

  expect(await screen.findByText('API Sample Track')).toBeInTheDocument();
  expect(fetchAudioCatalog).toHaveBeenCalledTimes(1);
});
