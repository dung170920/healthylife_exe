import { HeaderBreadcumbs } from "components";
import { Line } from "react-chartjs-2";

const Statistial = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const labels = [];

  export const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 })
        ),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: labels.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 })
        ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <>
      <HeaderBreadcumbs
        heading="Thống kê tiêu thụ calories"
        links={[
          { name: "Trang chủ", to: "/" },
          { name: "Thống kê tiêu thụ calories" },
        ]}
      />
    </>
  );
};

export default Statistial;
