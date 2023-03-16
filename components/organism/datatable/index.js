import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import DataTable, {
  paginationPerPage,
  paginationRowsPerPageOptions,
} from "react-data-table-component";
import { CustomPagination } from "/components/molekuls";

function Datatable() {
  const columns = [
    {
      name: "Name",
      selector: (row) => row.nama,
    },
    {
      name: "Kelas",
      selector: (row) => row.kelas,
    },
  ];

  const [state, setState] = useState([]);

  useEffect(() => {
    let data = [];
    for (let i = 1; i <= 38; i++) {
      data.push({
        id: i,
        nama: `name ${i}`,
        kelas: `class ${i}`,
      });
    }

    setState(data);
  }, []);

  return (
    <DataTable
      columns={columns}
      data={state}
      pagination
      paginationPerPage={5}
      paginationComponent={CustomPagination}
    />
  );
}

export default Datatable;
