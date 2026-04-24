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

const TODOS = [
  { id: 'passports',    label: 'New passports',                    notes: 'All 5 family members',              done: false },
  { id: 'visas-au',     label: 'Australia visas (ETA)',             notes: 'Apply online at immi.homeaffairs.gov.au', done: false },
  { id: 'visas-nz',     label: 'New Zealand visas (NZeTA)',         notes: 'Apply via the NZeTA app',           done: false },
  { id: 'insurance',    label: 'Travel insurance',                  notes: '3-month multi-country, family of 5', done: false },
  { id: 'intl-license', label: 'International driving licence',     notes: 'Apply at post office (Lior + Sivan)', done: false },
  { id: 'vaccinations', label: 'Vaccinations',                      notes: 'Check requirements per country',    done: false },
];
