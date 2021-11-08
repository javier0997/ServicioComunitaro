import React from "react";
import MaterialTable from "material-table";

const Table = ({ data, columns }) => {
  return (
    <div>
      <MaterialTable
        data={data}
        columns={columns}
        options={{
          search: true,
          paging: true,
          filtering: false,
          showTitle: false,
          rowStyle: {
            fontSize: 14,
          },
        }}
      />
    </div>
  );
};

export default Table;
