export const SUBDISTRICTS = [
  {
    id: 'ugm-bulaksumur',
    name: 'UGM Bulaksumur',
    district: 'Caturtunggal, Depok',
    lat: -7.7713,
    lon: 110.3775,
    tag: 'Campus Core',
  },
  {
    id: 'pogung-sinduadi',
    name: 'Pogung / Sinduadi',
    district: 'Mlati, Sleman',
    lat: -7.7568,
    lon: 110.3695,
    tag: 'North UGM',
  },
  {
    id: 'gejayan-condongcatur',
    name: 'Gejayan / Condongcatur',
    district: 'Depok, Sleman',
    lat: -7.7586,
    lon: 110.3982,
    tag: 'East UGM',
  },
  {
    id: 'gondokusuman',
    name: 'Gondokusuman',
    district: 'Kota Yogyakarta',
    lat: -7.7834,
    lon: 110.3831,
    tag: 'South UGM',
  },
  {
    id: 'jetis-tugu',
    name: 'Jetis / Tugu',
    district: 'Kota Yogyakarta',
    lat: -7.7805,
    lon: 110.3646,
    tag: 'City Center',
  },
  {
    id: 'umbulharjo',
    name: 'Umbulharjo',
    district: 'Kota Yogyakarta',
    lat: -7.8132,
    lon: 110.3887,
    tag: 'South Jogja',
  },
  {
    id: 'kotagede',
    name: 'Kotagede',
    district: 'Kota Yogyakarta',
    lat: -7.8286,
    lon: 110.3995,
    tag: 'Southeast',
  },
  {
    id: 'ngaglik',
    name: 'Ngaglik',
    district: 'Sleman',
    lat: -7.7072,
    lon: 110.4024,
    tag: 'North Sleman',
  },
];

export const TRANSLATIONS = {
  en: {
    brandSub: 'Yogyakarta & UGM Air Quality · OpenWeather',
    navOverview: 'Overview',
    navSubdistricts: 'Subdistricts',
    navHealth: 'Health Meter',
    lastUpdated: 'Updated',
    refresh: 'Refresh',
    loading: 'Fetching OpenWeather data...',
    errorFetch: 'Unable to fetch OpenWeather data. Check your API key and retry.',
    apiKeyPrompt: 'Enter your OpenWeather API Key to load live air quality data:',
    apiKeyPlaceholder: 'Paste OpenWeather API key...',
    saveKey: 'Save Key',
    changeKey: 'API Key',
    healthMeterTitle: 'Health Meter Prediction',
    healthMeterSub: 'Predicted respiratory & outdoor safety index',
    aqiTitle: 'Air Quality Index',
    aqiSub: 'US AQI (from PM2.5) & OpenWeather scale',
    euAqi: 'OWM Scale (1-5)',
    subdistrictsTitle: 'Subdistricts Around UGM',
    subdistrictsSub: 'Tap a location to inspect',
    forecast24hTitle: '24-Hour AQI & Health Trend',
    forecast24hSub: 'Hourly prediction for',
    outlookTitle: '3-Day Health Outlook',
    outlookSub: 'Predicted daily range',
    today: 'Today',
    tomorrow: 'Tomorrow',
    day3: 'Day 3',
    outdoorExercise: 'Outdoor Activity',
    maskAdvice: 'Mask Guidance',
    sensitiveGroups: 'Sensitive Groups',
    status: {
      optimal: 'Optimal',
      good: 'Good',
      moderate: 'Moderate',
      caution: 'Unhealthy for Sensitive',
      unhealthy: 'Unhealthy',
    },
    advice: {
      optimal: {
        summary: 'Air is crisp and clean. Ideal for jogging around UGM Wisdom Park or cycling.',
        outdoor: 'Recommended',
        mask: 'Not needed',
        sensitive: 'Safe for all',
      },
      moderate: {
        summary: 'Acceptable air quality, though fine particulates (PM2.5) are slightly elevated.',
        outdoor: 'Moderate pace OK',
        mask: 'Optional',
        sensitive: 'Limit prolonged exertion',
      },
      caution: {
        summary: 'Elevated particulate matter. Consider indoor study or wearing a KN95 mask outdoors.',
        outdoor: 'Reduce intensity',
        mask: 'Recommended (KN95)',
        sensitive: 'Stay indoors if possible',
      },
      unhealthy: {
        summary: 'Poor air quality detected. Avoid outdoor sports and keep windows closed.',
        outdoor: 'Avoid outdoors',
        mask: 'Required outdoors',
        sensitive: 'High risk — stay indoors',
      },
    },
    pollutants: {
      pm2_5: { name: 'Particulate 2.5', desc: 'Fine inhalable particles' },
      pm10: { name: 'Particulate 10', desc: 'Coarse dust & pollen' },
      ozone: { name: 'Ozone (O₃)', desc: 'Ground-level ozone' },
      nitrogen_dioxide: { name: 'Nitrogen Dioxide', desc: 'Traffic & combustion' },
      sulphur_dioxide: { name: 'Sulfur Dioxide', desc: 'Industrial & fuel' },
      carbon_monoxide: { name: 'Carbon Monoxide', desc: 'Vehicle emissions' },
    },
  },
  id: {
    brandSub: 'Kualitas Udara Yogyakarta & UGM · OpenWeather',
    navOverview: 'Ringkasan',
    navSubdistricts: 'Kecamatan',
    navHealth: 'Meter Kesehatan',
    lastUpdated: 'Diperbarui',
    refresh: 'Segarkan',
    loading: 'Mengambil data OpenWeather...',
    errorFetch: 'Gagal mengambil data OpenWeather. Periksa API key Anda.',
    apiKeyPrompt: 'Masukkan API Key OpenWeather Anda untuk memuat data kualitas udara:',
    apiKeyPlaceholder: 'Tempel API key OpenWeather...',
    saveKey: 'Simpan Key',
    changeKey: 'API Key',
    healthMeterTitle: 'Prediksi Meter Kesehatan',
    healthMeterSub: 'Indeks prediksi keamanan pernapasan & luar ruang',
    aqiTitle: 'Indeks Kualitas Udara',
    aqiSub: 'US AQI (dari PM2.5) & skala OpenWeather',
    euAqi: 'Skala OWM (1-5)',
    subdistrictsTitle: 'Wilayah Sekitar UGM',
    subdistrictsSub: 'Pilih lokasi untuk detail',
    forecast24hTitle: 'Tren AQI & Kesehatan 24 Jam',
    forecast24hSub: 'Prediksi per jam untuk',
    outlookTitle: 'Prakiraan Kesehatan 3 Hari',
    outlookSub: 'Rentang harian yang diprediksi',
    today: 'Hari Ini',
    tomorrow: 'Besok',
    day3: 'Hari ke-3',
    outdoorExercise: 'Aktivitas Luar',
    maskAdvice: 'Panduan Masker',
    sensitiveGroups: 'Kelompok Rentan',
    status: {
      optimal: 'Optimal',
      good: 'Baik',
      moderate: 'Sedang',
      caution: 'Kurang Sehat',
      unhealthy: 'Tidak Sehat',
    },
    advice: {
      optimal: {
        summary: 'Udara bersih dan segar. Ideal untuk lari pagi di Wisdom Park UGM atau bersepeda.',
        outdoor: 'Sangat disarankan',
        mask: 'Tidak perlu',
        sensitive: 'Aman untuk semua',
      },
      moderate: {
        summary: 'Kualitas udara cukup baik, namun partikel halus (PM2.5) sedikit meningkat.',
        outdoor: 'Aktivitas ringan aman',
        mask: 'Opsional',
        sensitive: 'Kurangi aktivitas berat',
      },
      caution: {
        summary: 'Partikulat meningkat. Pertimbangkan belajar di dalam ruangan atau gunakan masker KN95.',
        outdoor: 'Kurangi intensitas',
        mask: 'Disarankan (KN95)',
        sensitive: 'Tetap di dalam ruangan',
      },
      unhealthy: {
        summary: 'Kualitas udara buruk. Hindari olahraga luar ruang dan tutup jendela.',
        outdoor: 'Hindari luar ruang',
        mask: 'Wajib saat keluar',
        sensitive: 'Risiko tinggi — di dalam',
      },
    },
    pollutants: {
      pm2_5: { name: 'Partikulat 2.5', desc: 'Partikel halus terhirup' },
      pm10: { name: 'Partikulat 10', desc: 'Debu kasar & serbuk' },
      ozone: { name: 'Ozon (O₃)', desc: 'Ozon permukaan tanah' },
      nitrogen_dioxide: { name: 'Nitrogen Dioksida', desc: 'Emisi lalu lintas' },
      sulphur_dioxide: { name: 'Sulfur Dioksida', desc: 'Industri & bahan bakar' },
      carbon_monoxide: { name: 'Karbon Monoksida', desc: 'Emisi kendaraan' },
    },
  },
};

// Convert PM2.5 (μg/m³) to US AQI (0-500)
export function pm25ToUsAqi(pm) {
  if (pm == null) return 0;
  const breakpoints = [
    [0.0, 12.0, 0, 50],
    [12.1, 35.4, 51, 100],
    [35.5, 55.4, 101, 150],
    [55.5, 150.4, 151, 200],
    [150.5, 250.4, 201, 300],
    [250.5, 500.4, 301, 500],
  ];
  for (const [cLow, cHigh, iLow, iHigh] of breakpoints) {
    if (pm <= cHigh) {
      return Math.round(((iHigh - iLow) / (cHigh - cLow)) * (pm - cLow) + iLow);
    }
  }
  return 500;
}

export function computeHealthMeter(current) {
  if (!current) {
    return { score: 0, tier: 'moderate', color: '#FFB020', bg: '#FEF3C7' };
  }
  const aqi = current.us_aqi ?? 50;
  const pm25 = current.pm2_5 ?? 12;

  const aqiPenalty = Math.min(85, (aqi / 200) * 85);
  const pmPenalty = Math.min(15, (pm25 / 75) * 15);
  const score = Math.max(5, Math.round(100 - aqiPenalty - pmPenalty));

  if (aqi <= 50) {
    return { score, tier: 'optimal', color: '#00C853', bg: '#DCFCE7' };
  }
  if (aqi <= 100) {
    return { score, tier: 'moderate', color: '#FFB020', bg: '#FEF3C7' };
  }
  if (aqi <= 150) {
    return { score, tier: 'caution', color: '#F97316', bg: '#FFEDD5' };
  }
  return { score, tier: 'unhealthy', color: '#EF4444', bg: '#FEE2E2' };
}

export async function fetchSubdistrictAirQuality(loc, provider = 'open-meteo', apiKeys = {}) {
  if (provider === 'openweather') {
    const key = apiKeys.openweather;
    if (!key) throw new Error('OpenWeather API key required');
    const [curRes, fcRes] = await Promise.all([
      fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${loc.lat}&lon=${loc.lon}&appid=${key}`),
      fetch(`https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${loc.lat}&lon=${loc.lon}&appid=${key}`),
    ]);
    if (!curRes.ok) throw new Error(`OpenWeather API error (${curRes.status})`);
    const curJson = await curRes.json();
    const fcJson = fcRes.ok ? await fcRes.json() : { list: [] };
    const curItem = curJson.list?.[0];
    const comp = curItem?.components || {};
    const usAqi = pm25ToUsAqi(comp.pm2_5);

    const current = {
      us_aqi: usAqi,
      european_aqi: curItem?.main?.aqi ?? 1,
      pm2_5: comp.pm2_5 ?? 0,
      pm10: comp.pm10 ?? 0,
      ozone: comp.o3 ?? 0,
      nitrogen_dioxide: comp.no2 ?? 0,
      sulphur_dioxide: comp.so2 ?? 0,
      carbon_monoxide: comp.co ?? 0,
    };

    const hourlyList = fcJson.list || [];
    const hourly = {
      time: hourlyList.map((item) => new Date(item.dt * 1000).toISOString()),
      us_aqi: hourlyList.map((item) => pm25ToUsAqi(item.components?.pm2_5 ?? 0)),
    };
    return { current, hourly };
  }

  if (provider === 'aqicn') {
    const token = apiKeys.aqicn;
    if (!token) throw new Error('AQICN API token required');
    const res = await fetch(`https://api.waqi.info/feed/geo:${loc.lat};${loc.lon}/?token=${token}`);
    if (!res.ok) throw new Error(`AQICN API error (${res.status})`);
    const json = await res.json();
    if (json.status !== 'ok') throw new Error(json.data || 'AQICN API error');

    const d = json.data;
    const iaqi = d.iaqi || {};
    const current = {
      us_aqi: typeof d.aqi === 'number' ? d.aqi : Number(d.aqi) || 0,
      european_aqi: '-',
      pm2_5: iaqi.pm25?.v ?? 0,
      pm10: iaqi.pm10?.v ?? 0,
      ozone: iaqi.o3?.v ?? 0,
      nitrogen_dioxide: iaqi.no2?.v ?? 0,
      sulphur_dioxide: iaqi.so2?.v ?? 0,
      carbon_monoxide: iaqi.co?.v ?? 0,
    };

    // Build 24h-like hourly array from current AQI if WAQI only gives daily forecast
    const now = new Date();
    const hourly = {
      time: Array.from({ length: 24 }, (_, i) => new Date(now.getTime() + i * 3600000).toISOString()),
      us_aqi: Array.from({ length: 24 }, () => current.us_aqi),
    };
    return { current, hourly };
  }

  // Default: open-meteo (no API key required)
  const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${loc.lat}&longitude=${loc.lon}&current=us_aqi,european_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone&hourly=us_aqi,pm2_5,pm10&timezone=Asia%2FJakarta&forecast_days=3`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Open-Meteo API error (${res.status})`);
  return await res.json();
}
