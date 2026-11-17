const API_BASE_URL = (
  process.env.REACT_APP_API_URL || "http://localhost:8000"
).replace(/\/+$/, "");

const formatDuration = (duration) => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
};

export const fetchAudioCatalog = async () => {
  const response = await fetch(`${API_BASE_URL}/api/v1/audios?limit=8`);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Unable to load the audio catalog");
  }
  if (!Array.isArray(result.data?.audios)) {
    throw new Error("Audio catalog response is invalid");
  }

  return result.data.audios.map((audio, index) => ({
    id: audio._id,
    position: String(index + 1).padStart(2, "0"),
    title: audio.title,
    artist: audio.owner?.fullName || audio.owner?.username || "Unknown artist",
    duration: audio.duration,
    durationLabel: formatDuration(audio.duration),
    image: audio.artwork,
    path: audio.audioFile,
  }));
};
