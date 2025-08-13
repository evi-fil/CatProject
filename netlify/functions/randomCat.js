export async function handler() {
  const apiKey = process.env.CAT_API_KEY;
  const url = "https://api.thecatapi.com/v1/images/search";

  const res = await fetch(url, {
    headers: { "x-api-key": apiKey }
  });

  const data = await res.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
}
