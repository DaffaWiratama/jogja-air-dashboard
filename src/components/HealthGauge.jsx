import React from 'react';
import { ShieldCheck, Activity, Wind } from 'lucide-react';

export default function HealthGauge({ health, t }) {
  const { score, tier, color, bg } = health;
  const advice = t.advice[tier] || t.advice.moderate;
  const statusLabel =
    tier === 'optimal'
      ? t.status.optimal
      : tier === 'moderate'
      ? t.status.moderate
      : tier === 'caution'
      ? t.status.caution
      : t.status.unhealthy;

  // Semi-circle arc math (radius 76, center 100, 92)
  const radius = 76;
  const circumference = Math.PI * radius;
  const progress = Math.max(0, Math.min(100, score)) / 100;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="card health-card">
      <div className="card-header">
        <div>
          <h2 className="card-title">{t.healthMeterTitle}</h2>
          <p className="card-sub">{t.healthMeterSub}</p>
        </div>
        <span
          className="status-pill"
          style={{ backgroundColor: bg, color: tier === 'moderate' ? '#92400E' : tier === 'optimal' ? '#155E34' : '#991B1B' }}
        >
          {statusLabel}
        </span>
      </div>

      <div className="gauge-wrap">
        <svg viewBox="0 0 200 112" className="gauge-svg" aria-label={`Health score ${score}%`}>
          {/* Background track */}
          <path
            d="M 24 96 A 76 76 0 0 1 176 96"
            fill="none"
            stroke="#E7E9E4"
            strokeWidth="16"
            strokeLinecap="round"
          />
          {/* Active arc */}
          <path
            d="M 24 96 A 76 76 0 0 1 176 96"
            fill="none"
            stroke={color}
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 0.6s ease, stroke 0.4s ease' }}
          />
        </svg>
        <div className="gauge-center">
          <div className="gauge-score tabular-nums">{score}%</div>
          <div className="gauge-caption">Health Index</div>
        </div>
      </div>

      <p className="advisory-text">{advice.summary}</p>

      <div className="guidance-grid">
        <div className="guidance-item">
          <Activity size={14} className="guidance-icon" />
          <div>
            <div className="guidance-label">{t.outdoorExercise}</div>
            <div className="guidance-val">{advice.outdoor}</div>
          </div>
        </div>
        <div className="guidance-item">
          <ShieldCheck size={14} className="guidance-icon" />
          <div>
            <div className="guidance-label">{t.maskAdvice}</div>
            <div className="guidance-val">{advice.mask}</div>
          </div>
        </div>
        <div className="guidance-item">
          <Wind size={14} className="guidance-icon" />
          <div>
            <div className="guidance-label">{t.sensitiveGroups}</div>
            <div className="guidance-val">{advice.sensitive}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
