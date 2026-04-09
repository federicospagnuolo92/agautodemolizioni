async function fetchAutoFromAirtable() {
  const res = await fetch('/api/auto');
  const data = await res.json();
  return data.records.map((r) => {
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
