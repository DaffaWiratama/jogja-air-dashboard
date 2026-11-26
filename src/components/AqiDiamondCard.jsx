import React from 'react';

export default function AqiDiamondCard({ current, health, t }) {
  const aqi = current?.us_aqi ?? 0;
  const euAqi = current?.european_aqi ?? 0;
  const pm25 = current?.pm2_5 ?? 0;
  const pm10 = current?.pm10 ?? 0;
  const o3 = current?.ozone ?? 0;

  const statusText =
    health.tier === 'optimal'
      ? t.status.good
      : health.tier === 'moderate'
      ? t.status.moderate
      : health.tier === 'caution'
      ? t.status.caution
      : t.status.unhealthy;

  const bars = [
    { label: 'PM2.5', value: `${pm25.toFixed(1)} μg/m³`, pct: Math.min(100, (pm25 / 75) * 100), color: health.color },
    { label: 'OZONE (O₃)', value: `${o3.toFixed(1)} μg/m³`, pct: Math.min(100, (o3 / 120) * 100), color: '#FFB020' },
    { label: 'PM10', value: `${pm10.toFixed(1)} μg/m³`, pct: Math.min(100, (pm10 / 100) * 100), color: '#155E34' },
  ];

  return (
    <div className="card aqi-card">
      <div className="card-header">
        <div>
          <h2 className="card-title">{t.aqiTitle}</h2>
          <p className="card-sub">{t.aqiSub}</p>
        </div>
        <span className="eu-pill tabular-nums">
          {t.euAqi}: {euAqi}
        </span>
      </div>

      <div className="diamond-wrap">
        <div
          className="diamond-badge"
          style={{ borderColor: health.color, backgroundColor: health.bg }}
        >
          <div className="diamond-inner">
            <span className="diamond-value tabular-nums">{aqi}</span>
            <span className="diamond-label" style={{ color: health.tier === 'moderate' ? '#92400E' : '#155E34' }}>
              {statusText.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      <div className="aqi-bars">
        {bars.map((b) => (
          <div key={b.label} className="aqi-bar-row">
            <div className="aqi-bar-meta">
              <span className="aqi-bar-name">{b.label}</span>
              <span className="aqi-bar-val tabular-nums">{b.value}</span>
            </div>
            <div className="aqi-bar-track">
              <div
                className="aqi-bar-fill"
                style={{ width: `${Math.max(6, b.pct)}%`, backgroundColor: b.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
