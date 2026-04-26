// Application-facing API. Wraps the mock back-end. In production this would call a real REST API via axios.
import SpaceTravelMockApi from './SpaceTravelMockApi';

const SpaceTravelApi = {
  getPlanets: () => SpaceTravelMockApi.getPlanets(),
  getSpacecrafts: () => SpaceTravelMockApi.getSpacecrafts(),
  getSpacecraftById: ({ id }) => SpaceTravelMockApi.getSpacecraftById({ id }),
  buildSpacecraft: (payload) => SpaceTravelMockApi.buildSpacecraft(payload),
  destroySpacecraftById: ({ id }) => SpaceTravelMockApi.destroySpacecraftById({ id }),
  sendSpacecraftToPlanet: (payload) => SpaceTravelMockApi.sendSpacecraftToPlanet(payload),
};

export default SpaceTravelApi;
