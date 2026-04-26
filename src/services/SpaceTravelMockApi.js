// Mock API backed by localStorage. Mimics a back-end for the Space Travel app.
const STORAGE_KEY = 'spaceTravelData';
const LATENCY_MS = 250;

function generateId() { return Math.random().toString(36).slice(2, 11); }
function delay(value) { return new Promise((resolve) => setTimeout(() => resolve(value), LATENCY_MS)); }

function seed() {
  return {
    planets: [
      { id: 1, name: 'Mercury', currentPopulation: 4000000000, pictureUrl: '' },
      { id: 2, name: 'Venus',   currentPopulation: 0, pictureUrl: '' },
      { id: 3, name: 'Earth',   currentPopulation: 8000000000, pictureUrl: '' },
      { id: 4, name: 'Mars',    currentPopulation: 0, pictureUrl: '' },
      { id: 5, name: 'Jupiter', currentPopulation: 0, pictureUrl: '' },
      { id: 6, name: 'Saturn',  currentPopulation: 0, pictureUrl: '' },
      { id: 7, name: 'Uranus',  currentPopulation: 0, pictureUrl: '' },
      { id: 8, name: 'Neptune', currentPopulation: 0, pictureUrl: '' },
    ],
    spacecrafts: [
      { id: generateId(), name: 'Ranger-1', capacity: 1000000, description: 'Heavy lifter.', pictureUrl: '', currentLocation: 3 },
    ],
  };
}

function load() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) { const data = seed(); localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); return data; }
  try { return JSON.parse(raw); } catch (e) { const data = seed(); localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); return data; }
}
function save(data) { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }

const SpaceTravelMockApi = {
  getPlanets() { return delay({ isError: false, data: load().planets }); },
  getSpacecrafts() { return delay({ isError: false, data: load().spacecrafts }); },
  getSpacecraftById({ id }) {
    const found = load().spacecrafts.find((s) => s.id === id);
    if (!found) return delay({ isError: true, data: null });
    return delay({ isError: false, data: found });
  },
  buildSpacecraft({ name, capacity, description, pictureUrl = '' }) {
    const data = load();
    const earth = data.planets.find((p) => p.name === 'Earth');
    const newCraft = {
      id: generateId(), name, capacity: Number(capacity), description, pictureUrl,
      currentLocation: earth ? earth.id : data.planets[0].id,
    };
    data.spacecrafts.push(newCraft);
    save(data);
    return delay({ isError: false, data: newCraft });
  },
  destroySpacecraftById({ id }) {
    const data = load();
    data.spacecrafts = data.spacecrafts.filter((s) => s.id !== id);
    save(data);
    return delay({ isError: false, data: null });
  },
  sendSpacecraftToPlanet({ spacecraftId, targetPlanetId }) {
    const data = load();
    const craft = data.spacecrafts.find((s) => s.id === spacecraftId);
    if (!craft) return delay({ isError: true, data: 'Spacecraft not found' });
    if (craft.currentLocation === targetPlanetId) return delay({ isError: true, data: 'Target planet must differ from current location' });
    const origin = data.planets.find((p) => p.id === craft.currentLocation);
    const target = data.planets.find((p) => p.id === targetPlanetId);
    if (!origin || !target) return delay({ isError: true, data: 'Planet not found' });
    const moved = Math.min(craft.capacity, origin.currentPopulation);
    origin.currentPopulation -= moved;
    target.currentPopulation += moved;
    craft.currentLocation = targetPlanetId;
    save(data);
    return delay({ isError: false, data: { moved } });
  },
};

export default SpaceTravelMockApi;
