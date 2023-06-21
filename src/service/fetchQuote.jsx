export default function fetchQuote() {
  return fetch(import.meta.env.VITE_QUOTE_API, {
    method: 'GET',
    headers: { 'X-Api-Key': import.meta.env.VITE_NINJA_API_KEY },
    contentType: 'json',
  })
    .then((res) => res)
    .catch((error) => console.log(error))
    .then((data) => data.json());
}
