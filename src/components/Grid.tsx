import React from "react";

type Props = {
  children: JSX.Element | JSX.Element[];
};

const Grid = ({ children }: Props) => {
  return (
    <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
      {children}
    </div>
  );
};

export default Grid;
