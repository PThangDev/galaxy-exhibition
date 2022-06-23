import React from "react";
import { createRef } from "react";
import { useRef } from "react";
import galaxy from "src/assets/galaxy.json";
const Test = () => {
  const itemsRef = useRef();
  const [elRefs, setElRefs] = React.useState([]);
  console.log(itemsRef);
  React.useEffect(() => {
    // add or remove refs
    setElRefs((elRefs) =>
      Array(galaxy.length)
        .fill()
        .map((_, i) => elRefs[i] || createRef())
    );
  }, [galaxy.length]);
  console.log(elRefs);
  return (
    <div>
      {galaxy.map((item, index) => (
        <div key={index} ref={elRefs[index]}>
          name
        </div>
      ))}
    </div>
  );
};

export default Test;
