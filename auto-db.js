const SUPABASE_URL = 'https://wqxeyluxvepscqcvatik.supabase.co';
const SUPABASE_KEY = 'sb_publishable_YfGqts0tVEF4TQQZEvfoOA_QnVOHNMa';

async function fetchAutoFromSupabase() {
  const [autoRes, fotoRes] = await Promise.all([
    fetch(`${SUPABASE_URL}/rest/v1/auto?select=*`, {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
    }),
    fetch(`${SUPABASE_URL}/rest/v1/foto?select=*`, {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
    })
  ]);

  const autoData = await autoRes.json();
  const fotoData = await fotoRes.json();

  return autoData.map(a => {
    const fotoDiQuestAuto = fotoData.filter(f => f.auto_id === a.id).map(f => f.url);
    const fotoFinali = fotoDiQuestAuto.length > 0 ? fotoDiQuestAuto : (a.foto_url ? [a.foto_url] : ['assets/logoAGS.png']);
    return {
      id: String(a.id),
      marca: a.marca || '',
      modello: a.modello || '',
      versione: a.versione || '',
      anno: a.anno || '',
      km: a.chilometri ? a.chilometri.toLocaleString('it-IT') : '',
      carburante: a.carburante || '',
      cv: a.cv || '',
      targa: a.targa || '',
      foto: fotoFinali,
      disponibile: true
    };
  });
}
