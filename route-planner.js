import { catalog } from './attractions.js';
const groups = {
  classic: ['old', 'islands', 'villageCoast', 'south', 'harbour', 'guia', 'northold', 'panda', 'studio'],
  heritage: ['old', 'south', 'taipa', 'harbour', 'northold', 'guia', 'village', 'cotai'],
  family: ['harbour', 'cotai', 'panda', 'studio', 'taipa', 'old', 'village'],
  coast: ['villageCoast', 'south', 'waterfront', 'guia', 'harbour', 'taipa', 'old'],
  shopping: ['islands', 'cotai', 'old', 'studio', 'harbour', 'village'],
};
const priority = {
  classic: ['senado', 'ruins', 'lover', 'fortress', 'museum', 'cunha', 'venice', 'london', 'paris', 'coloane', 'pier', 'francis', 'beach', 'ama', 'tower'],
  heritage: ['senado', 'ruins', 'fortress', 'museum', 'ama', 'mandarin', 'lilau', 'hotung', 'taipahouses', 'ieclong'],
  family: ['science', 'grandprix', 'wharf', 'lotus', 'teamlab', 'venice', 'mgmcotai', 'panda', 'golden', 'waterpark'],
  coast: ['coloane', 'pier', 'francis', 'beach', 'cheocvan', 'longchao', 'penha', 'tower', 'guia'],
  shopping: ['cunha', 'venice', 'london', 'paris', 'galaxy', 'mgmcotai', 'golden'],
};
export function planRoute(options) {
  const { days, start, end, pace, budget, rain, theme } = options;
  if (end - start < 120 || !Number.isFinite(start) || !Number.isFinite(end)) {
    throw new Error('time');
  }
  const used = new Set();
  const schedule = [];
  let tickets = 0;
  const mealsPerDay = budget / days < 180 ? 100 : 160;
  const transportPerDay = pace === 'slow' ? 100 : 40;
  const admissionBudget = Math.max(0, budget - days * (mealsPerDay + transportPerDay));
  const order = groups[theme] || groups.classic;
  const popular = priority[theme] || priority.classic;
  for (let day = 0; day < days; day++) {
    let group = order[day % order.length];
    let candidates = catalog.filter(p => {
      const inGroup = group === 'islands' ? [2, 3].includes(p.area)
        : group === 'villageCoast' ? ['village', 'coast'].includes(p.zone)
        : p.zone === group;
      return inGroup && !p.bookingOnly && !used.has(p.id) && (!rain || p.indoor);
    });
    if (!candidates.length) {
      candidates = catalog.filter(p => !p.bookingOnly && !used.has(p.id) && (!rain || p.indoor));
      const zone = candidates.sort((a, b) => a.area - b.area)[0]?.zone;
      candidates = candidates.filter(p => p.zone === zone);
    }
    candidates.sort((a, b) => {
      const score = p => {
        const idx = popular.indexOf(p.id);
        return idx >= 0 ? idx : 100 + (p.theme === theme ? 0 : 50) + p.rank;
      };
      return score(a) - score(b);
    });
    const stops = [];
    let time = start;
    let previous = { area: 1, zone: 'hotel' };
    let ate = start >= 14 * 60 || end <= 12 * 60;
    for (const p of candidates) {
      // Keep the rest of a day's route in the same area or the Taipa/Cotai pair.
      if (stops.some(s => s.id) && p.area !== previous.area && !([2, 3].includes(p.area) && [2, 3].includes(previous.area))) continue;
      const travel = p.zone === previous.zone ? (pace === 'slow' ? 20 : 15)
        : p.area === previous.area ? 25
        : [2, 3].includes(p.area) && [2, 3].includes(previous.area) ? 30 : 55;
      const duration = p.duration + (pace === 'slow' ? 15 : 0);
      const lunch = !ate && time + travel + duration > 12 * 60 + 30 ? 60 : 0;
      const arrival = Math.max(time + lunch + travel, p.minTime);
      const back = p.area === 1 ? 30 : 55;
      if (arrival + duration + back > end || tickets + p.allowance > admissionBudget) continue;
      if (lunch) {
        stops.push({ meal: true, time, end: time + 60, area: previous.area });
        ate = true;
        time += 60;
      }
      stops.push({ id: p.id, time: arrival, end: arrival + duration, travel, allowance: p.allowance });
      time = arrival + duration;
      previous = p;
      used.add(p.id);
      tickets += p.allowance;
    }
    if (stops.some(s => s.id)) {
      const travel = previous.area === 1 ? 30 : 55;
      stops.push({ back: true, time, end: time + travel });
    }
    schedule.push(stops);
  }
  return { version: 2, schedule, estimate: days * (mealsPerDay + transportPerDay) + tickets,
    meals: days * mealsPerDay, transport: days * transportPerDay, tickets,
    budget, rain, theme, total: catalog.length, considered: catalog.filter(p => !rain || p.indoor).length,
    count: used.size };
}
