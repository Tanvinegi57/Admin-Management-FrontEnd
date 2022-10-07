import React from "react";
import { Typography, Divider } from "antd";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const Donutdata = {
  datasets: [
    {
      label: "# of Votes",
      data: [199, 20, 201],
      backgroundColor: ["#4a69bd", "lightblue", "blue"],
      // borderColor: ["rgba(255, 99, 132, 1)", "rgba(255, 159, 64, 1)"],
      borderWidth: 1,
    },
  ],
};

function DoughnutChart() {
  return (
    <>
      <Doughnut data={Donutdata} />
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Typography
          variant="text"
          color="initial"
          textAlign="center"
          sx={{ m: 1 }}
        >
          Active 199
        </Typography>
        <Typography
          variant="text"
          color="initial"
          textAlign="center"
          sx={{ m: 1 }}
        >
          Blocked 20
        </Typography>
      </div>
      <hr />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Typography
          variant="text"
          color="initial"
          textAlign="center"
          sx={{ m: 2 }}
        >
          Total User 201
        </Typography>
      </div>
    </>
  );
}

export default DoughnutChart;
