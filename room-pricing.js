// Historical market reference, not a regulated price or a live competitor quote.
export const benchmark = {
  amount: 1124.6,
  period: '2025',
  source: 'https://dataplus.macaotourism.gov.mo/document/CHT/Report/HotelsOccupancyRate/2025/MHA%20Monthly%20Report-%20Dec%202025.pdf',
};

export const baseRates = [850, 1050, 1250, 1450, 1950];
const DAY = 86400000;

export function parseDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error('dates');
  const date = new Date(value + 'T00:00:00Z');
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
    throw new Error('dates');
  }
  return date;
}

// Hotel-configured peak windows repeat annually. These are hotel assumptions,
// not a statutory holiday calendar. Peak rates override weekend rates.
export function nightRate(room, dateKey) {
  if (!Number.isInteger(room) || !baseRates[room]) throw new Error('room');
  const date = parseDate(dateKey);
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const peak = (month === 1 && day <= 3) || (month === 5 && day <= 5)
    || (month === 10 && day <= 7) || (month === 12 && day >= 24);
  const weekend = [5, 6].includes(date.getUTCDay());
  const kind = peak ? 'peak' : weekend ? 'weekend' : 'weekday';
  const factor = peak ? 1.5 : weekend ? 1.2 : 1;
  return { date: dateKey, kind, rate: Math.round(baseRates[room] * factor) };
}

export function quoteStay(room, checkin, checkout, rooms = 1) {
  const start = parseDate(checkin).getTime();
  const end = parseDate(checkout).getTime();
  const nights = (end - start) / DAY;
  if (nights <= 0 || nights > 90 || !Number.isInteger(nights)) throw new Error('dates');
  if (!Number.isInteger(rooms) || rooms < 1 || rooms > 10) throw new Error('rooms');
  const nightly = Array.from({ length: nights }, (_, index) => {
    const key = new Date(start + index * DAY).toISOString().slice(0, 10);
    return nightRate(room, key);
  });
  const perRoom = nightly.reduce((sum, night) => sum + night.rate, 0);
  return { nightly, nights, rooms, perRoom, total: perRoom * rooms, average: perRoom / nights };
}
