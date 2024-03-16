const DEFAULT_TIMEOUT_MS = 5000; // 5 seconds.

function handleResponse(response, reloadOn401 = true) {
  console.log(response);
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (reloadOn401 && response.status === 401) {
	// auto logout if 401 response returned from api
	logout();
	location.reload(true);
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}

function fetchWithTimeout(resource, options = {}) {
  const { timeout = DEFAULT_TIMEOUT_MS } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = fetch(resource, {
    ...options,
    signal: controller.signal
  });
  clearTimeout(id);
  return response;
}

function urlEncodeFilter(filter) {
  return encodeURIComponent(filter)
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\*/g, '%2A');
}
export { handleResponse, fetchWithTimeout, urlEncodeFilter };
