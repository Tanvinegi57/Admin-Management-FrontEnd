import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Divider } from "antd";
import { Doughnut } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

function ChartApp() {
  const [adminData, setAdminData] = useState([]);
  const navigate = useNavigate();
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
        data: [
          adminData.Web,
          adminData.Android,
          adminData.IOS,
          adminData.AppTotal,
        ],
        backgroundColor: ["red", "yellow", "orange", "#8926b3"],
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
      <Doughnut
        data={Donutdata}
        onClick={() => navigate("/systemConfig/appversion")}
      />
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Typography
          variant="text"
          color="initial"
          textAlign="center"
          sx={{ m: 1 }}
        >
          WEB {adminData.Web}
        </Typography>
        <Typography
          variant="text"
          color="initial"
          textAlign="center"
          sx={{ m: 1 }}
        >
          Android {adminData.Android}
        </Typography>
        <Typography
          variant="text"
          color="initial"
          textAlign="center"
          sx={{ m: 1 }}
        >
          IOS {adminData.IOS}
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
          Total User {adminData.AppTotal}
        </Typography>
      </div>
    </>
  );
}

export default ChartApp;
