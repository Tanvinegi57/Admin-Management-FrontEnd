import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Divider } from "antd";
import { Doughnut } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
function ChartAdmin() {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/admin/getAllDetails"
      );
      console.log("This is graph data::", response.data.data);
      setAdminData(response.data.data);
      console.log("This is admin data-----", adminData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const Donutdata = {
    datasets: [
      {
        label: "# of Votes",
        data: [adminData.Block, adminData.UnBlock, adminData.count],
        backgroundColor: ["#8e44ad", "#f1c40f", "#4a69bd"],
        borderColor: [
          "rgba(255, 99, 132)",
          "rgba(255, 162, 235)",
          "rgba(255, 205, 86)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <Doughnut data={Donutdata} onClick={() => navigate("/usersM")} />
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Typography
          variant="text"
          color="initial"
          textAlign="center"
          sx={{ m: 1 }}
        >
          Blocked {adminData.Block}
        </Typography>
        <Typography
          variant="text"
          color="initial"
          textAlign="center"
          sx={{ m: 1 }}
        >
          UnBlocked {adminData.UnBlock}
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
          Total User {adminData.count}
        </Typography>
      </div>
    </>
  );
}

export default ChartAdmin;
