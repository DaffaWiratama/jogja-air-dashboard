import React from 'react';

export default function PollutantCard({ title, desc, value, unit, ratio, accent = '#155E34', variant = 'bars' }) {
  const safeRatio = Math.max(0.08, Math.min(1, ratio));

  return (
    <div className="card pollutant-card">
      <div className="pollutant-top">
        <span className="pollutant-name">{title}</span>
        <span className="pollutant-dot" style={{ backgroundColor: accent }} />
      </div>
      <div className="pollutant-val-row">
        <span className="pollutant-val tabular-nums">{value}</span>
        <span className="pollutant-unit">{unit}</span>
      </div>
      <p className="pollutant-desc">{desc}</p>

      <div className="pollutant-viz">
        {variant === 'bars' ? (
          <div className="mini-bars">
            {[0.35, 0.55, 0.42, 0.78, 0.62, safeRatio].map((h, idx) => (
              <span
                key={idx}
                className="mini-bar"
                style={{
                  height: `${Math.round(h * 100)}%`,
                  backgroundColor: idx === 5 ? accent : '#E2E6E0',
                }}
              />
            ))}
          </div>
        ) : (
          <svg viewBox="0 0 120 28" className="mini-wave" preserveAspectRatio="none">
            <path
              d={`M 0 22 Q 20 ${24 - safeRatio * 10}, 40 16 T 80 ${18 - safeRatio * 8} T 120 ${20 - safeRatio * 14}`}
              fill="none"
              stroke={accent}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>
    </div>
  );
}
