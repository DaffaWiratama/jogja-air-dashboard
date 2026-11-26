import React, { useState } from 'react';

export default function ForecastChart({ hourly, locationName, t }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  if (!hourly || !hourly.time) return null;

  // Take next 24 hours starting from current hour
  const now = new Date();
  const startIdx = hourly.time.findIndex((iso) => new Date(iso) >= now);
  const safeStart = startIdx === -1 ? 0 : startIdx;
  const slice = hourly.time.slice(safeStart, safeStart + 24).map((iso, i) => {
    const idx = safeStart + i;
    const aqi = hourly.us_aqi?.[idx] ?? 50;
    const hourLabel = new Date(iso).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });
    const healthScore = Math.max(5, Math.round(100 - Math.min(85, (aqi / 200) * 85)));
    return { hourLabel, aqi, healthScore };
  });

  const maxAqi = Math.max(100, ...slice.map((d) => d.aqi));

  const getBarColor = (aqi) => {
    if (aqi <= 50) return '#00C853';
    if (aqi <= 100) return '#FFB020';
    if (aqi <= 150) return '#F97316';
    return '#EF4444';
  };

  return (
    <div className="card forecast-card">
      <div className="card-header">
        <div>
          <h2 className="card-title">{t.forecast24hTitle}</h2>
          <p className="card-sub">
            {t.forecast24hSub} <strong>{locationName}</strong>
          </p>
        </div>
        {hoveredIdx !== null && slice[hoveredIdx] ? (
          <div className="chart-tooltip-pill tabular-nums">
            {slice[hoveredIdx].hourLabel} · AQI {slice[hoveredIdx].aqi} · Health {slice[hoveredIdx].healthScore}%
          </div>
        ) : (
          <div className="chart-legend">
            <span className="legend-dot" style={{ background: '#00C853' }} /> Good
            <span className="legend-dot" style={{ background: '#FFB020' }} /> Moderate
          </div>
        )}
      </div>

      <div className="bar-chart">
        {slice.map((item, idx) => {
          const heightPct = Math.max(12, Math.round((item.aqi / maxAqi) * 100));
          const isHovered = hoveredIdx === idx;
          return (
            <div
              key={item.hourLabel + idx}
              className="bar-col"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{
                    height: `${heightPct}%`,
                    backgroundColor: getBarColor(item.aqi),
                    opacity: hoveredIdx === null || isHovered ? 1 : 0.45,
                  }}
                />
              </div>
              {idx % 4 === 0 && (
                <span className="bar-label tabular-nums">{item.hourLabel.slice(0, 2)}h</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
