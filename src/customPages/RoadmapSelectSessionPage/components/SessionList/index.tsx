import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  type Session,
  useGetSessions,
  useDeleteSessionMutation,
} from '../../../../hooks/roadmap';
import useModal from '../../../../hooks/useModal';
import { translateColumns } from '../../../../utils/translate';
import SessionModal from '../SessionModal';

const SessionList = () => {
  const params = useParams();
  const curriculumId = Number(params.curriculumId);

  const navigate = useNavigate();

  const { sessions } = useGetSessions(curriculumId);
  const { mutateAsync: deleteSession } = useDeleteSessionMutation(curriculumId);

  const { open, openModal, closeModal } = useModal();
  const [editingSession, setEditingSession] = useState<Session>();

  const selectSession = (sessionId: number) => {
    navigate(`/roadmap/${sessionId}`);
  };

  const columns = [...translateColumns(sessions?.[0] ?? {})];

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sessions?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {Object.values(row).map((value, index) => (
                  <TableCell key={index} component="th" scope="row">
                    {value}
                  </TableCell>
                ))}
                <TableCell
                  onClick={() => {
                    openModal();
                    setEditingSession(row);
                  }}
                  align="right"
                  sx={{ width: 0 }}
                >
                  <Button variant="outlined" color="success">
                    수정
                  </Button>
                </TableCell>
                <TableCell
                  onClick={() => deleteSession(row.id)}
                  align="right"
                  sx={{ width: 0 }}
                >
                  <Button variant="outlined" color="error">
                    삭제
                  </Button>
                </TableCell>
                <TableCell
                  onClick={() => selectSession(row.id)}
                  align="right"
                  sx={{ width: 0 }}
                >
                  <Button variant="contained">선택</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <SessionModal
        open={open}
        onClose={closeModal}
        prevSession={editingSession}
      />
    </>
  );
};

export default SessionList;
