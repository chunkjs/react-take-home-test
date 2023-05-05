import React, { useState, useRef, useEffect } from "react";
import { IFilterComp, IDoesFilterPassParams } from "ag-grid-community";

interface CustomTextFilterProps {
  filterChangedCallback: () => void;
  colDef: any;
}

function CustomTextFilter(props: CustomTextFilterProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Call filterChangedCallback when the value of the input changes
    const input = inputRef.current;
    if (input) {
      input.addEventListener("input", props.filterChangedCallback);
    }
    return () => {
      if (input) {
        input.removeEventListener("input", props.filterChangedCallback);
      }
    };
  }, [props.filterChangedCallback]);

  const isFilterActive = () => {
    return value !== "";
  };

  const getModel = () => {
    return { value };
  };

  const doesFilterPass = (params: IDoesFilterPassParams) => {
    const cellValue = params.node.data[props.colDef.field];
    const filterValue = value;
    return cellValue.toLowerCase().includes(filterValue.toLowerCase());
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        ref={inputRef}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
