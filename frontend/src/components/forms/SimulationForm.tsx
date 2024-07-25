import { Form, Select, Button, InputNumber, FormProps, Flex } from "antd";
import { SimulationResult } from "../../types";
import Title from "antd/es/typography/Title";

const COMMUTE_MODES = [
  "walk",
  "bike",
  "bus",
  "car",
  "train",
  "motorbike",
  "unknown",
];

type FieldType = {
  oneWayDistance: number;
  commuteDaysPerYear: number;
  primaryMode: string;
  secondaryMode: string;
};

const SimulationForm = ({
  setSimulationResults,
}: {
  setSimulationResults: React.Dispatch<
    React.SetStateAction<SimulationResult | null>
  >;
}) => {
  // This is the event handler function that will be called on form submit
  const onFinish: FormProps<FieldType>["onFinish"] = ({
    oneWayDistance,
    commuteDaysPerYear,
    primaryMode,
    secondaryMode,
  }) => {
    const searchParams = new URLSearchParams({
      ...(oneWayDistance && { one_way_distance: oneWayDistance.toString() }),
      ...(commuteDaysPerYear && {
        commute_days_per_year: commuteDaysPerYear.toString(),
      }),
      primary_mode: primaryMode,
      ...(secondaryMode && { secondary_mode: secondaryMode.toString() }),
    });

    fetch(`http://localhost:5000/simulate?${searchParams.toString()}`)
      .then((resp) => resp.json())
      .then((data) => setSimulationResults(data));
  };

  // This is the event handler function that will be called when the form submission fails due to validation errors
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <>
      <Title level={2} style={{ textAlign: "center" }}>
        Simulation Parameters
      </Title>
      <Form
        labelCol={{ span: 16 }}
        labelAlign="left"
        name="simulate"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Primary Mode"
          name="primaryMode"
          rules={[{ required: true, message: "Please select Primary Mode!" }]}
        >
          <Select
            defaultValue={"Primary Mode"}
            style={{ width: "100%" }}
            onChange={(e) => console.log(e)}
            options={COMMUTE_MODES.map((mode) => ({
              label: mode,
              value: mode,
            }))}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Secondary Mode"
          name="secondaryMode"
          rules={[
            { required: false, message: "Please select Secondary Mode!" },
          ]}
        >
          <Select
            defaultValue={"Secondary Mode"}
            style={{ width: "100%" }}
            onChange={(e) => console.log(e)}
            options={COMMUTE_MODES.map((mode) => ({
              label: mode,
              value: mode,
            }))}
          />
        </Form.Item>

        <Form.Item<FieldType> label="One Way Distance" name="oneWayDistance">
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Commute Days Per Year"
          name="commuteDaysPerYear"
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Flex justify="center">
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Flex>
      </Form>

      <>
        <p>
          Inputs marked with <span style={{ color: "crimson" }}>*</span> are
          required, otherwise not.
        </p>
        <p>Not required field will use defaults.</p>
      </>
    </>
  );
};

export default SimulationForm;
