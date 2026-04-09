const AIRTABLE_TOKEN = 'IL_TUO_TOKEN_QUI';
const AIRTABLE_BASE  = 'appAKf0KEM8R99iT5';
const AIRTABLE_TABLE = 'tbl73JrAmDgIzwiLp';

async function fetchAutoFromAirtable() {
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE}/${AIRTABLE_TABLE}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` }
  });
  const data = await res.json();
  return data.records.map((r, i) => {
    const f = r.fields;
    return {
      id: r.id,
      marca: f.Marca || '',
      modello: f.Modello || '',
      versione: f.Versione || '',
      anno: f.Anno || '',
      km: f.Chilometri ? f.Chilometri.toLocaleString('it-IT') : '',
      carburante: f.Carburante || '',
      cv: f.CV || '',
      foto: f.Attachments ? f.Attachments.map(a => a.url) : ['assets/logoAGS.png'],
      disponibile: true
    };
  });
}
