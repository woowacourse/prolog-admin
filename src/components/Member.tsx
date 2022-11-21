import React from 'react';
import { Button } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useDataProvider } from 'react-admin';
import { useQuery } from 'react-query';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'username', headerName: 'User Name', width: 200 },
  { field: 'nickname', headerName: 'Nickname', width: 180 },
  {
    field: 'role',
    headerName: 'Role',
    width: 90,
  },
  {
    field: 'progress',
    headerName: 'progress',
    sortable: false,
    filterable: false,
    renderCell: (param: GridRenderCellParams) => (
      <Button
        variant="outlined"
        onClick={() => {
          fetch(`/members/${param.row.id}/promote/approve`, {
            method: 'POST',
          });
        }}
      >
        등업
      </Button>
    ),
  },
];

const Sessions = () => {
  const dataProvider = useDataProvider();
  const { data: users, isLoading } = useQuery('user', () =>
    dataProvider.getUsers()
  );

  if (isLoading) {
    return <></>;
  }

  return <DataGrid rows={users.data} columns={columns} />;
};

export default Sessions;
