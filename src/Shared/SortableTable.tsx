import { useState } from "react";

const SortableTable = () => {
  const [sortBy, setSortBy] = useState<string>("point");
  const [sortDirection, setSortDirection] = useState<SortDirection>("ASC");

  type SortDirection = "ASC" | "DESC";

  function updateSort(_sortBy: string) {
    console.log(
      "_sortBy",
      _sortBy,
      "sortBy",
      sortBy,
      "sortDirection",
      sortDirection
    );
    if (sortBy === _sortBy) {
      setSortDirection(sortDirection === "ASC" ? "DESC" : "ASC");
    } else {
      setSortBy(_sortBy);
      setSortDirection("ASC");
    }
  }

  interface ThProps {
    attribute: string;
    title: string;
    children: string;
  }

  const Th = (props: ThProps) => {
    const { attribute, title } = props;
    return (
      <th onClick={() => updateSort(attribute)} title={title}>
        {props.children}
      </th>
    );
  };

  return { sortDirection, sortBy, Th };
};

export default SortableTable;
