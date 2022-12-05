import { Button } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useGetMembers } from '../hooks/members';
import { client } from '../client';

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
          client.post(`/members/${param.row.id}/promote/approve`);
        }}
      >
        등업
      </Button>
    ),
  },
];

const Members = () => {
  const { data: users, isLoading, isError } = useGetMembers();

  if (isLoading || isError) {
    return <></>;
  }

  return <DataGrid rows={users.data} columns={columns} />;
};

export default Members;
