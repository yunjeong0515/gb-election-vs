const API_BASE_URL = 'https://mhkdtr7tnf.ap-northeast-1.awsapprunner.com';

async function apiFetch(path, options = {}) {
  try {
    const response = await fetch(API_BASE_URL + path, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText} for ${path}`);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error(`API fetch failed for ${path}:`, error);
    return null;
  }
}

async function apiCreateSession() {
  return apiFetch('/api/game/sessions', { method: 'POST' });
}

async function apiSubmitVote(sessionId, questionNumber, selectedCandidate) {
  return apiFetch(`/api/game/sessions/${sessionId}/votes`, {
    method: 'POST',
    body: JSON.stringify({ questionNumber, selectedCandidate }),
  });
}

async function apiGetResult(sessionId) {
  return apiFetch(`/api/game/sessions/${sessionId}/result`);
}
