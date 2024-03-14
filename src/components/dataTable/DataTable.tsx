import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";
import { Link, Navigate } from "react-router-dom";
import { del } from "../../axiosConfig";
import { useEffect, useState } from "react";

type Props = {
  columns: GridColDef[];
  rows: Object[];
  slug: string;
};

const DataTable = (props: Props) => {

  const handleDelete = async (id: number) => {
    try {
      const response = await del(`/${props.slug}/Eliminar/Admin?id=${id}`);
      console.log(id + " has been deleted!");
      alert(id + " has been deleted!");
      console.log(response);
      console.log(response.status);
      console.log(response.data.mensaje);
      // window.location.replace("/users");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Opciones",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action">
          <Link to={`/${props.slug}/${params.row.id}`}>
            <img src="/view.svg" alt="" />
          </Link>
          <div className="delete" onClick={() => handleDelete(params.row.id)}>
            <img src="/delete.svg" alt="" />
          </div>
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
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
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
      />
    </div>
  );
};

export default DataTable;
