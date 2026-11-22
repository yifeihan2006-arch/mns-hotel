// Room BAR and price conditions from sections 5.1 and 9 of the hotel plan.
export const pricingRevision = 'report-rates-20261122';
export const baseRates = [980, 1180, 1480, 1680, 2480];
export const accommodationTaxRate = 0.05;
export const rateFactors = Object.freeze({ weekday: 1, weekend: 1.2, festival: 1.5 });
const DAY = 86400000;

export function parseDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error('dates');
  const date = new Date(value + 'T00:00:00Z');
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
    throw new Error('dates');
  }
  return date;
}

// No published date calendar is available. A rate period is chosen for a
// calculation; the hotel must confirm its applicable dates before booking.
export function nightRate(room, dateKey, kind = 'weekday') {
  if (!Number.isInteger(room) || !baseRates[room]) throw new Error('room');
  parseDate(dateKey);
  if (!Object.hasOwn(rateFactors, kind)) throw new Error('period');
  // Each night has one period: festival and weekend factors never compound.
  return { date: dateKey, kind, rate: Math.round(baseRates[room] * 100 * rateFactors[kind]) / 100 };
}

export function quoteStay(room, checkin, checkout, rooms = 1, ratePlan = {}) {
  const start = parseDate(checkin).getTime();
  const end = parseDate(checkout).getTime();
  const nights = (end - start) / DAY;
  if (nights <= 0 || nights > 90 || !Number.isInteger(nights)) throw new Error('dates');
  if (!Number.isInteger(rooms) || rooms < 1 || rooms > 10) throw new Error('rooms');
  const defaultKind = ratePlan.defaultKind ?? 'weekday';
  const overrides = ratePlan.overrides ?? {};
  if (!Object.hasOwn(rateFactors, defaultKind) || !overrides || typeof overrides !== 'object' || Array.isArray(overrides)) throw new Error('period');
  const nightly = Array.from({ length: nights }, (_, index) => {
    const key = new Date(start + index * DAY).toISOString().slice(0, 10);
    return nightRate(room, key, Object.hasOwn(overrides, key) ? overrides[key] : defaultKind);
  });
  const perRoomCents = nightly.reduce((sum, night) => sum + Math.round(night.rate * 100), 0);
  const subtotalCents = perRoomCents * rooms;
  const taxCents = Math.round(subtotalCents * accommodationTaxRate);
  return { nightly, nights, rooms, perRoom: perRoomCents / 100,
    subtotal: subtotalCents / 100, tax: taxCents / 100,
    taxRate: accommodationTaxRate, serviceCharge: 0,
    total: (subtotalCents + taxCents) / 100,
    average: perRoomCents / 100 / nights, pricingRevision };
}
