import { CalendarComponent } from "@syncfusion/ej2-react-calendars";
import React from "react";
import SideBar from "../Sidebar/SideBar";
import SchedulerCalendar from "scheduler-calendar";
import "scheduler-calendar/dist/index.css";
// import "./calander.css";
const Calender = () => {
  return (
    <>
      <SideBar />

      <div
        className="container-fluid"
        style={{
          padding: "40px",
          marginLeft: "235px",
          // width: "900px",
        }}
      >
        <SchedulerCalendar
          availabilities={[
            {
              day: "mon",
              slots: [
                { from: "09:00", to: "10:30" },
                { from: "11:30", to: "13:00" },
                { from: "14:30", to: "17:00" },
              ],
              comment: "Test comment",
            },
            {
              day: "2021-01-26",
              slots: [
                { from: "09:00", to: "10:30" },
                { from: "11:30", to: "19:00" },
              ],
            },
          ]}
          availabilityType={"infinity"}
          duration={10}
          onIntervalChange={() => {}}
        />

        {/* <h1>calender</h1> */}
      </div>
    </>
  );
};

export default Calender;
