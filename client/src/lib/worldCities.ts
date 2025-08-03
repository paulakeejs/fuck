// Utility to fetch and parse unique city-country pairs from airports.dat.txt

export async function fetchWorldCities(): Promise<string[]> {
  const response = await fetch('/airports.dat.txt');
  const text = await response.text();
  const lines = text.split('\n');
  const cityCountrySet = new Set<string>();

  for (const line of lines) {
    // Format: id,"Airport Name","City","Country",...
    const match = line.match(/^[^,]+,"[^"]+","([^"]+)","([^"]+)"/);
    if (match) {
      const city = match[1].trim();
      const country = match[2].trim();
      if (city && country) {
        cityCountrySet.add(`${city}, ${country}`);
      }
    }
  }

  // Return sorted unique list
  return Array.from(cityCountrySet).sort((a, b) => a.localeCompare(b));
} 

