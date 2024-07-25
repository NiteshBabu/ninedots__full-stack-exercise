import { useState } from "react";
import { Col, Divider, Row } from "antd";
import { SimulationResult } from "../types";
import SimulationForm from "../components/forms/SimulationForm";
import SimulationResults from "../components/SimulationResults";



export function SimulatorPage() {

  const [simulationResults, setSimulationResults] = useState<SimulationResult | null>(null);

  return (
    <>
      <Row>
        <Col xs={24} lg={7}>
          <SimulationForm setSimulationResults={setSimulationResults} />
        </Col>
        <Col xs={0} lg={1}>
          <Divider type="vertical" style={{ height: "100%" }} />
        </Col>
        <Col xs={24} lg={16}>
          <SimulationResults simulationResults={simulationResults} />
        </Col>
      </Row>
    </>
  );
}
