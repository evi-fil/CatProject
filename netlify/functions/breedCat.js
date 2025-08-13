export async function handler(event) {
  const apiKey = process.env.CAT_API_KEY;
  const breedId = event.queryStringParameters?.breed_id;

  if (!breedId) {
    return { statusCode: 400, body: "Missing breed_id" };
  }

  const url = `https://api.thecatapi.com/v1/images/search?breed_id=${breedId}`;

  const res = await fetch(url, {
    headers: { "x-api-key": apiKey }
  });

  const data = await res.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
}
