export function darkenColor(hexColor: string, darkenAmount: number): string {
  // Convert hex to RGB first
  let r = parseInt(hexColor.slice(1, 3), 16);
  let g = parseInt(hexColor.slice(3, 5), 16);
  let b = parseInt(hexColor.slice(5, 7), 16);

  // Then convert to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h! /= 6;
  }

  // Darken color by reducing the lightness and slightly reduce saturation to simulate adding black
  l -= darkenAmount / 60;
  s -= darkenAmount / 30; // Adjusting saturation reduction rate if needed
  l = Math.max(0, Math.min(l, 1)); // Ensure l is between 0 and 1
  s = Math.max(0, Math.min(s, 1)); // Ensure s is between 0 and 1

  // Convert HSL back to RGB
  const hue2rgb = (p: number, q: number, t: number): number => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  r = hue2rgb(p, q, h! + 1 / 3);
  g = hue2rgb(p, q, h!);
  b = hue2rgb(p, q, h! - 1 / 3);

  // Convert RGB back to hex
  const rgbToHex = (color: number): string => {
    const hex = Math.round(color * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${rgbToHex(r)}${rgbToHex(g)}${rgbToHex(b)}`;
}

// Usage
const darkerBlue = darkenColor('#9BB1FF', 20); // Darken the light blue by 20%
const darkerOrange = darkenColor('#FF8B57', 20); // Darken the light orange by 20%
