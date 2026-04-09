export default async function handler(req, res) {
  const url = `https://api.airtable.com/v0/appAKf0KEM8R99iT5/tbl73JrAmDgIzwiLp`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}` }
  });
  const data = await response.json();
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json(data);
}
