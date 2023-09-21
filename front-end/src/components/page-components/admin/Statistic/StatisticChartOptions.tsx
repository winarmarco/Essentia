import {ChartOptions} from "chart.js";

const chartOptions: ChartOptions<"line"> = {
  scales: {
    x: {
      type: "time",
      time: {
        unit: "month",
        parser: "YYYY-MM-DD",
      },
      display: true,
      title: {
        display: true,
        text: "Month",
      },
    },
  },
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
};

export default chartOptions;
