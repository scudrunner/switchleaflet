import React, { useState } from "react";

export default function SelectBox({ setFeatureNum }) {
  // fetching a list of documents is done using an api in my application

  // set initial state of default selected option
  let [selected, setSelected] = useState(1);

  // update state of selected option
  const handleChange = (e) => {
    setSelected(e.target.value);
    // updating state of Map sends query to fetch document
    setFeatureNum(e.target.value);
  };

  return (
    <select value={selected} onChange={handleChange}>
      <option value="1">feature1</option>
      <option value="2">feature2</option>
    </select>
  );
}
