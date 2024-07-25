export type SimulationResult = {
  scenario: { [key: string]: number | string };
  total_kg_co2e: number;
  total_kg_co2e_per_mode: { mode: string; total_kg_co2e: number }[];
};
