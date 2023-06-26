export const fetchQuotes = async() => {
  const response = await fetch(import.meta.env.VITE_QUOTE_API);
  return response.json();
};
