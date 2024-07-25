import { Col, Row, Statistic, Card, Flex, StatisticProps } from "antd";
import BarChart from "./BarChart";
import Title from "antd/es/typography/Title";
import { SimulationResult } from "../types";
import CountUp from "react-countup/build";
import { titalize } from "../utils";

// This function formats the value displayed in the Statistic component
// It uses the CountUp library to animate the value with a comma separator and two decimal places
const formatter: StatisticProps["formatter"] = (value) => (
  <CountUp decimals={2} end={value as number} separator="," />
);

const SimulationResults = ({
  simulationResults,
}: {
  simulationResults: SimulationResult | null;
}) => {
  return (
    <>
      <Title level={2} style={{ textAlign: "center" }}>
        Simulation Results
      </Title>
      {simulationResults ? (
        <>
          <Row>
            <Col xs={24} lg={8}>
              <Card style={{ marginTop: "2rem" }}>
                <Statistic
                  title="Total Carbon Dioxide Emission"
                  suffix={"Kg"}
                  value={simulationResults?.total_kg_co2e}
                  formatter={formatter}
                />
              </Card>
            </Col>
            <Col xs={24} lg={{ offset: 2, span: 12 }}>
              {simulationResults && (
                <BarChart
                  data={{
                    labels: simulationResults?.total_kg_co2e_per_mode.map(
                      (item) => item.mode
                    ),
                    datasets: [
                      {
                        label: "CO2 Emission (Kg)",
                        data: simulationResults?.total_kg_co2e_per_mode.map(
                          (item) => item.total_kg_co2e
                        ),
                      },
                    ],
                  }}
                />
              )}
            </Col>
          </Row>

          <Row>
            <Col>
              <h2>Parameters Selected</h2>

              <Flex gap={10} wrap>
                {simulationResults &&
                  Object.keys(simulationResults.scenario).map((key: string) => {
                    return (
                      <Card bordered={false}>
                        <Statistic
                          title={titalize(key.replaceAll("_", " "))}
                          value={simulationResults.scenario[key]}
                        />
                      </Card>
                    );
                  })}
              </Flex>
            </Col>
          </Row>
        </>
      ) : (
        <Title level={5} style={{ textAlign: "center" }}>
          Please change some parameters & submit to get Co2 emission results
        </Title>
      )}
    </>
  );
};

export default SimulationResults;
