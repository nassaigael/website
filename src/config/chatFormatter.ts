export const enhanceFAQFormatting = (text: string): string => {
  const enhanced = text
    .replace(/\b(FIZANAKARA|Ali Tawarath|Anakara|Antemoro|Sorabe|Sakandro|Vakoka|Katibo|Antalaotra|Ramonjavelo|Marson|Tsaramonina|Randriamampionona)\b/g, '**$1**')
    .replace(/\b(1495|1970|202[4-5])\b/g, '**$1**')
    .replace(/\b(mission|objectifs|projets|valeurs|histoire|contact|membres)\b/gi, '✨ **$1**')
    .replace(/\b(\d{1,3}(?:[\s,]\d{3})*|\d+\s*(?:ans|années|membres|projets|taona|mpikambana|tetikasa))\b/g, '**$1**');

  return enhanced;
};

export const formatMessageText = (text: string): string => {
  if (!text) return '';

  const formatted = text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#ee5253] dark:text-[#ff6b6b]">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic text-gray-700 dark:text-gray-300">$1</em>')
    .replace(/contact@fizanakara\.mg/g, '📧 <strong class="text-[#ee5253]">contact@fizanakara.mg</strong>')
    .replace(/\(\+261\)\s*\d{2}\s*\d{2}\s*\d{3}\s*\d{2}/g, '📞 <strong class="text-[#ee5253]">$&</strong>')
    .replace(/www\.fizanakara\.mg/g, '🌐 <strong class="text-[#ee5253]">www.fizanakara.mg</strong>');

  return formatted;
};