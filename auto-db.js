const SUPABASE_URL = 'https://wqxeyluxvepscqcvatik.supabase.co';
const SUPABASE_KEY = 'sb_publishable_YfGqts0tVEF4TQQZEvfoOA_QnVOHNMa';

async function fetchAutoFromSupabase() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/auto?select=*&order=id.asc`, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`
    }
  });
  const data = await res.json();
  return data.map(a => ({
    id: a.id,
    marca: a.marca || '',
    modello: a.modello || '',
    versione: a.versione || '',
    anno: a.anno || '',
    km: a.chilometri ? a.chilometri.toLocaleString('it-IT') : '',
    carburante: a.carburante || '',
    cv: a.cv || '',
    foto: a.foto_url ? [a.foto_url] : ['assets/logoAGS.png'],
    disponibile: true
  }));
}
