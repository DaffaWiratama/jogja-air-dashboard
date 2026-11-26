import React, { useEffect, useState, useCallback } from 'react';
import { Leaf, RefreshCw, MapPin, Globe } from 'lucide-react';
import {
  SUBDISTRICTS,
  TRANSLATIONS,
  computeHealthMeter,
  fetchSubdistrictAirQuality,
} from './data/airQuality';
import HealthGauge from './components/HealthGauge';
import AqiDiamondCard from './components/AqiDiamondCard';
import PollutantCard from './components/PollutantCard';
import ForecastChart from './components/ForecastChart';
import './App.css';

export default function App() {
  const [lang, setLang] = useState('en');
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedId, setSelectedId] = useState(SUBDISTRICTS[0].id);
  const [provider, setProvider] = useState(
    () => localStorage.getItem('air_provider') || 'open-meteo'
  );
  const [apiKeys, setApiKeys] = useState(() => ({
    openweather: localStorage.getItem('owm_api_key') || import.meta.env.VITE_OPENWEATHER_API_KEY || '',
    aqicn: localStorage.getItem('aqicn_api_key') || import.meta.env.VITE_AQICN_API_KEY || '',
  }));
  const [keyInput, setKeyInput] = useState('');
  const [dataByLoc, setDataByLoc] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const t = TRANSLATIONS[lang];
  const needsKey = provider === 'openweather' || provider === 'aqicn';
  const hasKey = provider === 'open-meteo' || Boolean(apiKeys[provider]);

  const loadAllData = useCallback(async () => {
    if (needsKey && !apiKeys[provider]) return;
    setLoading(true);
    setError(null);
    try {
      const results = await Promise.all(
        SUBDISTRICTS.map(async (loc) => {
          const data = await fetchSubdistrictAirQuality(loc, provider, apiKeys);
          return [loc.id, data];
        })
      );
      setDataByLoc(Object.fromEntries(results));
      setLastUpdated(
        new Date().toLocaleTimeString(lang === 'id' ? 'id-ID' : 'en-US', {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    } catch (err) {
      setError(err.message || 'Fetch error');
    } finally {
      setLoading(false);
    }
  }, [lang, provider, apiKeys, needsKey]);

  const handleProviderChange = (nextProvider) => {
    localStorage.setItem('air_provider', nextProvider);
    setProvider(nextProvider);
    setKeyInput(apiKeys[nextProvider] || '');
    setError(null);
  };

  const handleSaveKey = (e) => {
    e.preventDefault();
    const trimmed = keyInput.trim();
    if (!trimmed) return;
    const storageKey = provider === 'openweather' ? 'owm_api_key' : 'aqicn_api_key';
    localStorage.setItem(storageKey, trimmed);
    setApiKeys((prev) => ({ ...prev, [provider]: trimmed }));
  };

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  const activeLoc = SUBDISTRICTS.find((l) => l.id === selectedId) || SUBDISTRICTS[0];
  const activeData = dataByLoc[selectedId];
  const current = activeData?.current;
  const health = computeHealthMeter(current);

  // Compute 3-day outlook from hourly data
  const getDailyOutlook = () => {
    if (!activeData?.hourly?.us_aqi) return [];
    const aqis = activeData.hourly.us_aqi;
    const labels = [t.today, t.tomorrow, t.day3];
    return [0, 1, 2].map((dayIdx) => {
      const slice = aqis.slice(dayIdx * 24, (dayIdx + 1) * 24).filter((v) => v != null);
      const min = slice.length ? Math.min(...slice) : 0;
      const max = slice.length ? Math.max(...slice) : 0;
      const avg = slice.length ? Math.round(slice.reduce((a, b) => a + b, 0) / slice.length) : 0;
      const dayHealth = computeHealthMeter({ us_aqi: avg, pm2_5: avg * 0.3 });
      return { label: labels[dayIdx], min, max, avg, health: dayHealth };
    });
  };

  const outlook = getDailyOutlook();

  return (
    <div className="app-shell">
      {/* Top Navigation */}
      <header className="topbar">
        <div className="brand">
          <div className="brand-icon">
            <Leaf size={18} strokeWidth={2.4} />
          </div>
          <div>
            <div className="brand-name">JogjaAir</div>
            <div className="brand-sub">{t.brandSub}</div>
          </div>
        </div>

        <nav className="nav-pills" aria-label="Dashboard sections">
          {[
            { id: 'overview', label: t.navOverview },
            { id: 'subdistricts', label: t.navSubdistricts },
            { id: 'health', label: t.navHealth },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`nav-pill ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="topbar-actions">
          <select
            className="provider-select"
            value={provider}
            onChange={(e) => handleProviderChange(e.target.value)}
            aria-label="Data Source"
          >
            <option value="open-meteo">Open-Meteo (Free)</option>
            <option value="openweather">OpenWeather</option>
            <option value="aqicn">AQICN (WAQI)</option>
          </select>

          <button
            className="lang-toggle"
            onClick={() => setLang((prev) => (prev === 'en' ? 'id' : 'en'))}
            title="Switch Language (EN / ID)"
          >
            <Globe size={14} />
            <span>{lang.toUpperCase()}</span>
          </button>

          <button className="refresh-btn" onClick={loadAllData} disabled={loading || !hasKey}>
            <RefreshCw size={14} className={loading ? 'spin' : ''} />
            <span>{lastUpdated ? `${t.lastUpdated} ${lastUpdated}` : t.refresh}</span>
          </button>
        </div>
      </header>

      {needsKey && (
        <form className="api-key-bar" onSubmit={handleSaveKey}>
          <span className="api-key-label">
            {provider === 'openweather'
              ? 'OpenWeather API Key:'
              : 'AQICN (WAQI) API Token:'}
          </span>
          <div className="api-key-input-group">
            <input
              type="password"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder={
                apiKeys[provider]
                  ? '•••••••• (saved — paste to update)'
                  : `Paste ${provider === 'openweather' ? 'OpenWeather' : 'AQICN'} key...`
              }
              className="api-key-input"
            />
            <button type="submit" className="api-key-save">
              {t.saveKey}
            </button>
          </div>
        </form>
      )}

      {/* Subdistrict Selector Strip */}
      <div className="subdistrict-strip">
        {SUBDISTRICTS.map((loc) => {
          const isSelected = loc.id === selectedId;
          const locAqi = dataByLoc[loc.id]?.current?.us_aqi;
          return (
            <button
              key={loc.id}
              className={`sub-chip ${isSelected ? 'active' : ''}`}
              onClick={() => setSelectedId(loc.id)}
            >
              <MapPin size={13} />
              <span className="sub-chip-name">{loc.name}</span>
              {locAqi !== undefined && (
                <span className="sub-chip-aqi tabular-nums">{locAqi}</span>
              )}
            </button>
          );
        })}
      </div>

      {error && (
        <div className="error-banner">
          <span>{t.errorFetch}</span>
          <button onClick={loadAllData}>{t.refresh}</button>
        </div>
      )}

      {/* Main Bento Grid */}
      <main className="bento-grid">
        {/* Top Row: Health Gauge + AQI Diamond + 6 Pollutant Cards */}
        {(activeTab === 'overview' || activeTab === 'health') && (
          <section className="top-row">
            <HealthGauge health={health} t={t} />
            <AqiDiamondCard current={current} health={health} t={t} />

            <div className="pollutants-grid">
              <PollutantCard
                title={t.pollutants.pm2_5.name}
                desc={t.pollutants.pm2_5.desc}
                value={current ? current.pm2_5.toFixed(1) : '--'}
                unit="μg/m³"
                ratio={(current?.pm2_5 ?? 0) / 75}
                accent={health.color}
                variant="bars"
              />
              <PollutantCard
                title={t.pollutants.sulphur_dioxide.name}
                desc={t.pollutants.sulphur_dioxide.desc}
                value={current ? current.sulphur_dioxide.toFixed(1) : '--'}
                unit="μg/m³"
                ratio={(current?.sulphur_dioxide ?? 0) / 40}
                accent="#155E34"
                variant="wave"
              />
              <PollutantCard
                title={t.pollutants.ozone.name}
                desc={t.pollutants.ozone.desc}
                value={current ? current.ozone.toFixed(1) : '--'}
                unit="μg/m³"
                ratio={(current?.ozone ?? 0) / 120}
                accent="#FFB020"
                variant="bars"
              />
              <PollutantCard
                title={t.pollutants.carbon_monoxide.name}
                desc={t.pollutants.carbon_monoxide.desc}
                value={current ? Math.round(current.carbon_monoxide) : '--'}
                unit="μg/m³"
                ratio={(current?.carbon_monoxide ?? 0) / 2000}
                accent="#155E34"
                variant="wave"
              />
              <PollutantCard
                title={t.pollutants.nitrogen_dioxide.name}
                desc={t.pollutants.nitrogen_dioxide.desc}
                value={current ? current.nitrogen_dioxide.toFixed(1) : '--'}
                unit="μg/m³"
                ratio={(current?.nitrogen_dioxide ?? 0) / 80}
                accent="#00C853"
                variant="bars"
              />
              <PollutantCard
                title={t.pollutants.pm10.name}
                desc={t.pollutants.pm10.desc}
                value={current ? current.pm10.toFixed(1) : '--'}
                unit="μg/m³"
                ratio={(current?.pm10 ?? 0) / 100}
                accent="#155E34"
                variant="wave"
              />
            </div>
          </section>
        )}

        {/* Bottom Row: Subdistricts List + 24h Forecast + 3-Day Outlook */}
        <section className="bottom-row">
          {(activeTab === 'overview' || activeTab === 'subdistricts') && (
            <div className="card subdistricts-card">
              <div className="card-header">
                <div>
                  <h2 className="card-title">{t.subdistrictsTitle}</h2>
                  <p className="card-sub">{t.subdistrictsSub}</p>
                </div>
              </div>
              <div className="subdistrict-list">
                {SUBDISTRICTS.map((loc) => {
                  const locCurrent = dataByLoc[loc.id]?.current;
                  const locHealth = computeHealthMeter(locCurrent);
                  const isActive = loc.id === selectedId;
                  return (
                    <button
                      key={loc.id}
                      className={`sub-list-item ${isActive ? 'active' : ''}`}
                      onClick={() => setSelectedId(loc.id)}
                    >
                      <div className="sub-list-left">
                        <span
                          className="sub-dot"
                          style={{ backgroundColor: locHealth.color }}
                        />
                        <div>
                          <div className="sub-list-name">{loc.name}</div>
                          <div className="sub-list-district">{loc.district}</div>
                        </div>
                      </div>
                      <div className="sub-list-right">
                        <span className="sub-list-aqi tabular-nums">
                          {locCurrent ? `${locCurrent.us_aqi} AQI` : '--'}
                        </span>
                        <span className="sub-list-health tabular-nums">
                          {locCurrent ? `${locHealth.score}%` : '--'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <ForecastChart
            hourly={activeData?.hourly}
            locationName={activeLoc.name}
            t={t}
          />

          <div className="card outlook-card">
            <div className="card-header">
              <div>
                <h2 className="card-title">{t.outlookTitle}</h2>
                <p className="card-sub">{t.outlookSub}</p>
              </div>
            </div>
            <div className="outlook-list">
              {outlook.map((day) => (
                <div key={day.label} className="outlook-row">
                  <span className="outlook-day">{day.label}</span>
                  <div className="outlook-bar-wrap">
                    <span className="outlook-min tabular-nums">{day.min}</span>
                    <div className="outlook-track">
                      <div
                        className="outlook-fill"
                        style={{
                          width: `${Math.min(100, Math.max(20, (day.avg / 150) * 100))}%`,
                          backgroundColor: day.health.color,
                        }}
                      />
                    </div>
                    <span className="outlook-max tabular-nums">{day.max}</span>
                  </div>
                  <span
                    className="outlook-score tabular-nums"
                    style={{ backgroundColor: day.health.bg, color: '#155E34' }}
                  >
                    {day.health.score}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
