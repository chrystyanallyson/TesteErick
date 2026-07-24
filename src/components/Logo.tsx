import React from 'react';

interface LogoProps {
  customLogoUrl?: string;
  onLogoChange?: (newUrl: string) => void;
  isEditing?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ customLogoUrl, onLogoChange, isEditing }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onLogoChange) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onLogoChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (customLogoUrl) {
    return (
      <div className="relative group flex justify-center items-center">
        <img
          src={customLogoUrl}
          alt="Logo Eric Moura"
          className="w-28 h-28 object-contain rounded-full border-2 border-emerald-800 print:w-28 print:h-28"
        />
        {isEditing && (
          <label className="absolute inset-0 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-xs font-semibold print:hidden transition-opacity">
            <span>Trocar Logo</span>
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
        )}
      </div>
    );
  }

  return (
    <div className="relative group flex justify-center items-center">
      {/* SVG recreating the exact Eric Moura Green Embroidered Patch Seal */}
      <svg
        viewBox="0 0 200 200"
        className="w-28 h-28 print:w-28 print:h-28 drop-shadow-md select-none"
      >
        <defs>
          {/* Canvas Fabric Weave Texture */}
          <pattern id="canvasWeave" width="4" height="4" patternUnits="userSpaceOnUse">
            <rect width="4" height="4" fill="#e8e5d8" />
            <path d="M 0,2 L 4,2 M 2,0 L 2,4" stroke="#d5d0bf" strokeWidth="0.8" />
          </pattern>

          {/* Green Ring Embroidery Thread Texture */}
          <pattern id="threadPattern" width="4" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(25)">
            <rect width="4" height="8" fill="#31633a" />
            <line x1="0" y1="0" x2="4" y2="8" stroke="#254d2d" strokeWidth="1.2" />
          </pattern>

          {/* Rope Border Pattern */}
          <pattern id="ropePattern" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="8" height="8" fill="#2d5234" />
            <line x1="0" y1="0" x2="8" y2="8" stroke="#4a7c53" strokeWidth="2.5" />
          </pattern>

          {/* Soft inner shadow filter for 3D patch depth */}
          <filter id="patchShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Outer Stitched Edge / Rope Ring */}
        <circle cx="100" cy="100" r="98" fill="#1b3620" />
        <circle cx="100" cy="100" r="95" fill="url(#ropePattern)" stroke="#1c3821" strokeWidth="1.5" />

        {/* Green Embroidered Outer Band */}
        <circle cx="100" cy="100" r="90" fill="url(#threadPattern)" stroke="#224828" strokeWidth="1" />

        {/* 8 Golden Embroidered Produce Icons around the green band */}
        <g stroke="#d8bc68" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.95">
          {/* 1. Top center: Cashew/Fruit */}
          <path d="M 95,16 Q 100,10 106,16 Q 108,24 100,26 Q 92,24 95,16 Z" />
          
          {/* 2. Top Right: Tomato Slice */}
          <circle cx="140" cy="28" r="6" />
          <circle cx="140" cy="28" r="2" fill="#d8bc68" />

          {/* 3. Right: Pineapple */}
          <ellipse cx="172" cy="72" rx="5" ry="7" strokeDasharray="2,2" />
          <path d="M 170,62 L 172,66 L 174,62" />

          {/* 4. Bottom Right: Cucumber/Corn */}
          <ellipse cx="160" cy="130" rx="5" ry="9" transform="rotate(-30 160 130)" strokeDasharray="3,1" />

          {/* 5. Bottom Center: Tomato */}
          <circle cx="100" cy="172" r="7" />
          <path d="M 96,166 Q 100,164 104,166 L 100,169 Z" fill="#d8bc68" />

          {/* 6. Bottom Left: Pear */}
          <path d="M 40,132 C 34,142 48,150 44,132 Z" />

          {/* 7. Left: Garlic/Onion */}
          <path d="M 26,72 Q 20,80 28,84 Q 34,80 26,72 Z" />

          {/* 8. Top Left: Corn Cob */}
          <ellipse cx="44" cy="30" rx="6" ry="9" transform="rotate(35 44 30)" strokeDasharray="2,2" />
        </g>

        {/* Inner Stitched Border Ring */}
        <circle cx="100" cy="100" r="65" fill="none" stroke="#234728" strokeWidth="2" strokeDasharray="3,2" />

        {/* White / Cream Fabric Center Circle */}
        <circle cx="100" cy="100" r="63" fill="url(#canvasWeave)" filter="url(#patchShadow)" />
        <circle cx="100" cy="100" r="63" fill="none" stroke="#1d3b22" strokeWidth="1" />

        {/* Central Bold Green Embroidered Text "ERIC" */}
        <g filter="url(#patchShadow)">
          <text
            x="96"
            y="108"
            textAnchor="middle"
            fill="#235c30"
            fontSize="38"
            fontWeight="900"
            fontFamily="'Arial Black', Impact, sans-serif"
            letterSpacing="-1"
          >
            ERIC
          </text>

          {/* Small Gold "+" Cross between I and C */}
          <path d="M 124,96 L 124,102 M 121,99 L 127,99" stroke="#caa246" strokeWidth="2" strokeLinecap="round" />

          {/* "MOURA" underneath, aligned slightly to the right under ERIC */}
          <text
            x="110"
            y="130"
            textAnchor="middle"
            fill="#235c30"
            fontSize="18"
            fontWeight="900"
            fontFamily="'Arial Black', Arial, sans-serif"
            letterSpacing="0.5"
          >
            MOURA
          </text>
        </g>
      </svg>

      {isEditing && (
        <label className="absolute inset-0 bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer text-xs font-semibold print:hidden transition-opacity p-2 text-center">
          <span>Carregar Imagem</span>
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </label>
      )}
    </div>
  );
};
