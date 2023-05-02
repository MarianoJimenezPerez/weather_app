import React from "react";

const Suggestion = (props) => {
  const { sug, handleSelect } = props;

  return (
    <li
      className="text-left pt-2 pl-10 hover:bg-gray-500"
      onClick={() => handleSelect(sug)}
    >
      {sug.formatted}
    </li>
  );
};

export default Suggestion;
