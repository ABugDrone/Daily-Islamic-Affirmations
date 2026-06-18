/**
 * Share-to-Image Utility
 * Generates beautiful dua card images for sharing on social media
 * Works completely offline using device canvas rendering
 */

import { type Dua } from "@/lib/data/duas";

export interface ShareImageOptions {
  width?: number;
  height?: number;
  backgroundColor?: string;
  accentColor?: string;
  includeAppLogo?: boolean;
}

const DEFAULT_OPTIONS: ShareImageOptions = {
  width: 1080,
  height: 1350,
  backgroundColor: "#1B6B4F", // Emerald Green
  accentColor: "#D4AF37", // Gold
  includeAppLogo: true,
};

/**
 * Generate a shareable image URL from a dua
 * Uses canvas to create an image that can be shared on social media
 */
export function generateDuaImageSVG(
  dua: Dua,
  options: ShareImageOptions = {}
): string {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const { width = 1080, height = 1350, backgroundColor, accentColor } = opts;

  // Escape SVG special characters
  const escapeXml = (str: string) => {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const arabicText = escapeXml(dua.arabic);
  const transliteration = escapeXml(dua.transliteration);
  const englishText = escapeXml(dua.english);
  const source = escapeXml(dua.source);
  const categoryLabel = dua.category.charAt(0).toUpperCase() + dua.category.slice(1);

  // Create SVG
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <!-- Background -->
      <rect width="${width}" height="${height}" fill="${backgroundColor}"/>
      
      <!-- Decorative top bar -->
      <rect width="${width}" height="80" fill="${accentColor}"/>
      
      <!-- App name -->
      <text x="${width / 2}" y="50" font-size="28" font-weight="bold" fill="${backgroundColor}" text-anchor="middle" font-family="Arial">
        Daily Islamic Affirmations
      </text>
      
      <!-- Main content area -->
      <rect x="40" y="120" width="${width - 80}" height="${height - 240}" fill="white" rx="20"/>
      
      <!-- Arabic text -->
      <text x="${width / 2}" y="220" font-size="32" font-weight="bold" fill="${backgroundColor}" text-anchor="middle" font-family="Arial" direction="rtl">
        ${arabicText.substring(0, 50)}
      </text>
      
      <!-- Transliteration -->
      <text x="${width / 2}" y="300" font-size="16" fill="#666" text-anchor="middle" font-family="Arial">
        ${transliteration.substring(0, 60)}
      </text>
      
      <!-- English translation -->
      <text x="60" y="380" font-size="18" fill="#333" font-family="Arial" text-anchor="start">
        ${englishText.substring(0, 80)}
      </text>
      
      <!-- Category badge -->
      <rect x="60" y="${height - 180}" width="200" height="40" fill="${accentColor}" rx="20"/>
      <text x="160" y="${height - 155}" font-size="14" font-weight="bold" fill="${backgroundColor}" text-anchor="middle" font-family="Arial">
        ${escapeXml(dua.category.toUpperCase())}
      </text>
      
      <!-- Source -->
      <text x="60" y="${height - 100}" font-size="12" fill="#666" font-family="Arial">
        Source: ${source}
      </text>
      
      <!-- Share prompt -->
      <text x="${width / 2}" y="${height - 30}" font-size="14" fill="#999" text-anchor="middle" font-family="Arial">
        Shared from Daily Islamic Affirmations
      </text>
    </svg>
  `;

  return svg;
}

/**
 * Convert SVG to data URL for sharing
 */
export function svgToDataUrl(svg: string): string {
  const encoded = encodeURIComponent(svg);
  return `data:image/svg+xml;utf8,${encoded}`;
}

/**
 * Generate a shareable image for a dua
 */
export function generateShareImage(
  dua: Dua,
  options: ShareImageOptions = {}
): string {
  const svg = generateDuaImageSVG(dua, options);
  return svgToDataUrl(svg);
}

/**
 * Format dua text for social media sharing
 */
export function formatDuaForSharing(dua: Dua): string {
  return `
📿 ${dua.category.toUpperCase()}

🕌 Arabic:
${dua.arabic}

📖 Transliteration:
${dua.transliteration}

🌟 English:
${dua.english}

📚 Source: ${dua.source}

✨ Shared from Daily Islamic Affirmations
#IslamicAffirmations #Dua #Quran #Hadith
  `.trim();
}

/**
 * Get share text for different platforms
 */
export function getShareText(dua: Dua, platform: "whatsapp" | "twitter" | "facebook" | "generic" = "generic"): string {
  const baseText = formatDuaForSharing(dua);
  const categoryLabel = dua.category.charAt(0).toUpperCase() + dua.category.slice(1);

  switch (platform) {
    case "whatsapp":
      return `📿 *${categoryLabel}*\n\n${baseText}`;
    case "twitter":
      return `📿 ${categoryLabel}\n\n${dua.english}\n\n#IslamicAffirmations #Dua`;
    case "facebook":
      return `🕌 ${categoryLabel}\n\n${dua.english}\n\nShared from Daily Islamic Affirmations`;
    default:
      return baseText;
  }
}

/**
 * Create a simple text-based share card
 */
export function createShareCard(dua: Dua): string {
  const categoryLabel = dua.category.charAt(0).toUpperCase() + dua.category.slice(1);
  return `
╔════════════════════════════════════╗
║  Daily Islamic Affirmations        ║
╠════════════════════════════════════╣
║                                    ║
║  ${categoryLabel}
║                                    ║
║  Arabic:                           ║
║  ${dua.arabic}
║                                    ║
║  English:                          ║
║  ${dua.english}
║                                    ║
║  Source: ${dua.source}
║                                    ║
╚════════════════════════════════════╝
  `.trim();
}
