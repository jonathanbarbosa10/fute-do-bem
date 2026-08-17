import React from 'react';
import { TeamId } from '@/lib/types';

interface CountryBadgeProps {
  teamId: TeamId;
  size?: 'sm' | 'md' | 'lg';
}

export const CountryBadge: React.FC<CountryBadgeProps> = ({ teamId, size = 'md' }) => {
  const dim = {
    sm: 'w-8 h-10',
    md: 'w-12 h-14',
    lg: 'w-16 h-20',
  }[size];

  switch (teamId) {
    case 'brasil':
      return (
        <div className={`relative flex-shrink-0 ${dim} drop-shadow-md`}>
          <svg viewBox="0 0 100 120" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 5 L90 20 V65 C90 92 70 110 50 115 C30 110 10 92 10 65 V20 L50 5 Z" fill="#002776" stroke="#ffdf00" strokeWidth="5" />
            <polygon points="50,18 82,62 50,102 18,62" fill="#009c3b" />
            <circle cx="50" cy="62" r="18" fill="#002776" stroke="#ffffff" strokeWidth="1.5" />
            <path d="M35 62 Q50 56 65 62" stroke="#ffffff" strokeWidth="2.5" fill="none" />
            <text x="50" y="32" textAnchor="middle" fill="#ffdf00" fontSize="16" fontWeight="900">CBF</text>
            {/* 5 Stars */}
            <g fill="#ffdf00" transform="translate(10, -5) scale(0.8)">
              <polygon points="25,12 27,18 33,18 28,21 30,27 25,23 20,27 22,21 17,18 23,18" />
              <polygon points="40,8 42,14 48,14 43,17 45,23 40,19 35,23 37,17 32,14 38,14" />
              <polygon points="55,6 57,12 63,12 58,15 60,21 55,17 50,21 52,15 47,12 53,12" />
              <polygon points="70,8 72,14 78,14 73,17 75,23 70,19 65,23 67,17 62,14 68,14" />
              <polygon points="85,12 87,18 93,18 88,21 90,27 85,23 80,27 82,21 77,18 83,18" />
            </g>
          </svg>
        </div>
      );

    case 'argentina':
      return (
        <div className={`relative flex-shrink-0 ${dim} drop-shadow-md`}>
          <svg viewBox="0 0 100 120" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 5 L90 20 V65 C90 92 70 110 50 115 C30 110 10 92 10 65 V20 L50 5 Z" fill="#ffffff" stroke="#74acdf" strokeWidth="5" />
            {/* Sky blue stripes */}
            <rect x="25" y="20" width="12" height="85" fill="#74acdf" />
            <rect x="63" y="20" width="12" height="85" fill="#74acdf" />
            {/* AFA Emblem & Sun */}
            <circle cx="50" cy="55" r="16" fill="#f6b40e" stroke="#d97706" strokeWidth="2" />
            <text x="50" y="90" textAnchor="middle" fill="#d97706" fontSize="18" fontWeight="900">AFA</text>
            {/* 3 Stars */}
            <g fill="#d97706" transform="translate(15, -4) scale(0.9)">
              <polygon points="25,12 27,18 33,18 28,21 30,27 25,23 20,27 22,21 17,18 23,18" />
              <polygon points="50,6 52,12 58,12 53,15 55,21 50,17 45,21 47,15 42,12 48,12" />
              <polygon points="75,12 77,18 83,18 78,21 80,27 75,23 70,27 72,21 67,18 73,18" />
            </g>
          </svg>
        </div>
      );

    case 'franca':
      return (
        <div className={`relative flex-shrink-0 ${dim} drop-shadow-md`}>
          <svg viewBox="0 0 100 120" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 5 L90 20 V65 C90 92 70 110 50 115 C30 110 10 92 10 65 V20 L50 5 Z" fill="#002395" stroke="#ffffff" strokeWidth="4" />
            <text x="50" y="32" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="900">FFF</text>
            {/* Golden Rooster */}
            <path d="M45 75 Q40 55 58 45 Q65 42 62 55 Q72 50 65 65 T50 82 Z" fill="#f6b40e" />
            <circle cx="58" cy="46" r="2" fill="#002395" />
            {/* 2 Stars */}
            <g fill="#f6b40e" transform="translate(20, -4) scale(0.9)">
              <polygon points="35,10 37,16 43,16 38,19 40,25 35,21 30,25 32,19 27,16 33,16" />
              <polygon points="65,10 67,16 73,16 68,19 70,25 65,21 60,25 62,19 57,16 63,16" />
            </g>
          </svg>
        </div>
      );

    case 'alemanha':
      return (
        <div className={`relative flex-shrink-0 ${dim} drop-shadow-md`}>
          <svg viewBox="0 0 100 120" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="60" r="45" fill="#ffffff" stroke="#000000" strokeWidth="5" />
            <circle cx="50" cy="60" r="40" fill="none" stroke="#000000" strokeWidth="1.5" />
            <text x="50" y="42" textAnchor="middle" fill="#000000" fontSize="14" fontWeight="900">DFB</text>
            {/* Black Eagle */}
            <path d="M30 65 L40 55 H60 L70 65 L60 75 H40 Z" fill="#000000" />
            <polygon points="50,55 45,72 55,72" fill="#dc2626" />
            {/* 4 Stars */}
            <g fill="#eab308" transform="translate(10, -8) scale(0.8)">
              <polygon points="30,12 32,18 38,18 33,21 35,27 30,23 25,27 27,21 22,18 28,18" />
              <polygon points="45,8 47,14 53,14 48,17 50,23 45,19 40,23 42,17 37,14 43,14" />
              <polygon points="60,8 62,14 68,14 63,17 65,23 60,19 55,23 57,17 52,14 58,14" />
              <polygon points="75,12 77,18 83,18 78,21 80,27 75,23 70,27 72,21 67,18 73,18" />
            </g>
          </svg>
        </div>
      );

    default:
      return null;
  }
};
