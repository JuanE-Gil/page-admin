import { DataGrid, GridColDef, GridFilterModel, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";
import React from "react";

type Props = {
  columns: GridColDef[];
  rows: Object[];
  slug: string;
};

const DataTable = (props: Props) => {

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={[...props.columns]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
        disableColumnSelector
        disableDensitySelector
      />
    </div>
  );
};

export default DataTable;
