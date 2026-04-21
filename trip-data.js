// ─────────────────────────────────────────────
//  Shwarzwald Family Trip 2026 — Trip Data
//  Edit this file to update the dashboard.
// ─────────────────────────────────────────────

const FLIGHTS = [
  { date: '2026-11-01', label: '✈️ TLV → BKK', sub: 'Departs 21:30 · El Al LY083',       sleep: null },
  { date: '2026-11-02', label: '✈️ Arrives Bangkok', sub: '13:50 · El Al LY083',           sleep: 'Bangkok' },
  { date: '2026-11-03', label: '✈️ BKK → SYD',    sub: 'Departs 18:00 · EK5151',          sleep: null },
  { date: '2026-11-04', label: '✈️ Arrives Sydney', sub: '07:35 · EK5151',                 sleep: 'Sydney' },
  { date: '2026-11-09', label: '✈️ SYD → CHC',    sub: 'Dep 08:45 · Arr 14:00 · EK412',  sleep: 'Christchurch' },
];

// City stays implied by flights, no hotel booked yet
const KNOWN_STAYS = {
  '2026-11-05': 'Sydney',
  '2026-11-06': 'Sydney',
  '2026-11-07': 'Sydney',
  '2026-11-08': 'Sydney',
};

const HOTELS = [
  {
    name: "Roger's",
    city: 'Christchurch',
    checkIn:  '2026-11-09',
    checkOut: '2026-11-14',
    nights: 5,
    confirmation: '',
    bookedVia: 'Private stay',
    notes: ''
  },
];

const ACTIVITIES = [
  // { date: '2026-11-15', label: 'Hobbiton Tour', time: '10:00', notes: 'Ref XYZ' },
];
