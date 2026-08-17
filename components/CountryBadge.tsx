import React from 'react';
import { TeamId } from '@/lib/types';

interface CountryBadgeProps {
  teamId: TeamId;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const CountryBadge: React.FC<CountryBadgeProps> = ({ teamId, size = 'md' }) => {
  const dimensions = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-xl',
    xl: 'w-20 h-20 text-2xl',
  }[size];

  return (
    <div className={`relative flex-shrink-0 ${dimensions} rounded-full overflow-hidden border-2 border-white/80 shadow-lg group hover:scale-105 transition-transform`}>
      {teamId === 'brasil' && (
        <svg viewBox="0 0 100 70" className="w-full h-full object-cover">
          {/* Green background */}
          <rect width="100" height="70" fill="#009c3b" />
          {/* Yellow diamond */}
          <polygon points="50,6 93,35 50,64 7,35" fill="#ffdf00" />
          {/* Blue circle */}
          <circle cx="50" cy="35" r="16" fill="#002776" />
          {/* White arch */}
          <path d="M36 37 Q50 31 64 37" stroke="#ffffff" strokeWidth="2.5" fill="none" />
        </svg>
      )}

      {teamId === 'argentina' && (
        <svg viewBox="0 0 100 70" className="w-full h-full object-cover">
          {/* Sky blue / White / Sky blue horizontal stripes */}
          <rect y="0" width="100" height="23.33" fill="#74acdf" />
          <rect y="23.33" width="100" height="23.33" fill="#ffffff" />
          <rect y="46.66" width="100" height="23.34" fill="#74acdf" />
          {/* Sun of May */}
          <circle cx="50" cy="35" r="7" fill="#f6b40e" stroke="#d97706" strokeWidth="0.8" />
          <circle cx="50" cy="35" r="4" fill="#f6b40e" />
        </svg>
      )}

      {teamId === 'franca' && (
        <svg viewBox="0 0 100 70" className="w-full h-full object-cover">
          {/* Blue / White / Red vertical stripes */}
          <rect x="0" y="0" width="33.33" height="70" fill="#002395" />
          <rect x="33.33" y="0" width="33.33" height="70" fill="#ffffff" />
          <rect x="66.66" y="0" width="33.34" height="70" fill="#ed2939" />
        </svg>
      )}

      {teamId === 'alemanha' && (
        <svg viewBox="0 0 100 70" className="w-full h-full object-cover">
          {/* Black / Red / Gold horizontal stripes */}
          <rect y="0" width="100" height="23.33" fill="#000000" />
          <rect y="23.33" width="100" height="23.33" fill="#dd0000" />
          <rect y="46.66" width="100" height="23.34" fill="#ffce00" />
        </svg>
      )}
    </div>
  );
};
