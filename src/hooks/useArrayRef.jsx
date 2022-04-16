import React from "react";

const useArrayRef = () => {
  const refs = [];
  return [refs, (el) => el && refs.push(el)];
};

export default useArrayRef;
