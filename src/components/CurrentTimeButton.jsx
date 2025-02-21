import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";

const CurrentTimeButton = () => {
  const [currentTime, setCurrentTime] = useState(getFormattedTime());

  // Function to get formatted time, date, and day
  function getFormattedTime() {
    const now = new Date();
    const options = { weekday: "long", year: "numeric", month: "short", day: "numeric" };
    const date = now.toLocaleDateString("en-US", options);
    const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    return `${date} | ${time}`;
  }

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getFormattedTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

    return (
      <>
    <Button variant="outlined" color="primary" sx={{mr:'5px'}}>
      {currentTime}
      </Button>     

    </>
  );
};

export default CurrentTimeButton;
