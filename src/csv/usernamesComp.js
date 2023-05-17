import React, { useEffect, useState } from "react";
import Papa from "papaparse";

function UsernamesComponent({ setNames }) {
  useEffect(() => {
    const fetchUsernames = async () => {
      const response = await fetch("usernames.csv"); // Assuming "usernames.csv" is in the same directory
      const text = await response.text();

      const { data } = Papa.parse(text, { header: false });
      const usernames = data.flat().filter((username) => username.trim() !== "");
      console.log("Thiw",usernames);
      setNames(usernames);
    };

    fetchUsernames();
  }, [setNames]);

  return null; // Since this component doesn't render anything, we can return null
}

export default UsernamesComponent;
