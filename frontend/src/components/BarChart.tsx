import { Bar } from "react-chartjs-2";
import {
  Chart,
  ChartData,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

Chart.register(Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const BarChart = ({ data }: { data: ChartData<"bar"> }) => {
  return (
    <Bar
      data={data}
      options={{ borderColor: "brown", backgroundColor: "#1890ff" }}
    />
  );
};

export default BarChart;
