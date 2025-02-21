import { useState, useCallback, useEffect } from 'react';
import ApplyLeaveFrom from './markAttendanceFrom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { _users } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { TableNoData } from '../table-no-data';
import { UserTableRow } from '../ul-table-row';
import { UserTableHead } from '../ul-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { UserTableToolbar } from '../ul-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import type { UserProps } from '../ul-table-row';
import api from 'src/utils/api';
import CurrentTimeButton from 'src/components/CurrentTimeButton';

// ----------------------------------------------------------------------

export function UserAttendance() {
  const table = useTable();
  const [isPunchIn, setIsPunchIn] = useState(false)
  const [bdisable, setIDisable] = useState(false)
  const [fetchToggle, setFetchToggle] = useState(false)
  const empdata = {
    "employeeId": "67b7a9e3fdbbba393d2fb252"
  }

  const [attendance, setAttendance] = useState([
    {
      "_id": "",
      "employeeId": "",
      "status": "",
      "inTime": "",
      "createdAt": "",
      "updatedAt": "",
      "__v": '',
      "outTime": "",
      "workingHours": ""
    }
  ])

  const fetchPendinLeave = async() => {
    let { data } = await api.get('/att/')
    setAttendance(data.data)
  }
  useEffect(() => {
    fetchPendinLeave()
  }, [fetchToggle])

 

  const [filterName, setFilterName] = useState('');
  const dataFiltered: UserProps[] = applyFilter({
    inputData: attendance,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });



  const notFound = !dataFiltered.length && !!filterName;


  const checkLastRow = () => {
    if (attendance.length === 0 ) {
      setIsPunchIn(false);
      setIDisable(false);
      return;
    } else {      
      const lastEntry = attendance[0];
      const lastEntryDate = new Date(lastEntry.createdAt);
      const today = new Date();
      const isSameDay = lastEntryDate.toDateString() === today.toDateString();

      if (!isSameDay){
      setIsPunchIn(false);
      setIDisable(false);
        return;
      } else {
        if (lastEntry.inTime && !lastEntry.outTime) {
          setIsPunchIn(true);
          setIDisable(false);
        } else if (lastEntry.outTime) {
          setIsPunchIn(false);
          setIDisable(true);
        }
      }
    };
  };


  useEffect(() => {
    checkLastRow()
  })

  const handePunchIn = async () => {
    const { data } = await api.post('att/punch-in', empdata)
    setFetchToggle(!fetchToggle)
  }
  const handePunchOut = async () => {
    const { data } = await api.post('att/punch-out', empdata)
    setFetchToggle(!fetchToggle)
  }

  const handelPunchInOut = () => {
    if (isPunchIn) {
      handePunchOut()
    }else{
      handePunchIn()
    }
  }



  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Attendance
        </Typography>
        <CurrentTimeButton />
        {/* <Button
          variant="contained"
          color="inherit"
          disabled={bdisable}
          // startIcon={<Iconify icon="mingcute:add-line" />}
          // onClick={handeFormToggle}
        >
          {isPunchIn ? 'Punch Out' : bdisable ? 'Ok Bye' : 'Punch In'}
          
        </Button> */}

        <Button
          variant="contained"
          color="inherit"
          disabled={bdisable}
          onClick={handelPunchInOut}
        >
          {bdisable ? "Ok Bye" : isPunchIn ? "Punch Out" : "Punch In"}
        </Button>
      </Box>

      <Card>
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={attendance.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked:any) =>
                  table.onSelectAllRows(
                    checked,
                    attendance.map((user:any) => user._id)
                  )
                }
                headLabel={[
                  { id: 'apply_on', label: 'Date' },
                  { id: 'satus', label: 'Status' },
                  { id: 'leave_from', label: 'In Time' },
                  { id: 'leave_upto', label: 'Out Time' },
                  { id: 'leave_upto', label: 'Working Hour' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, _users.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}

              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        {/* <TablePagination
          component="div"
          page={table.page}
          count={_users.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
            /> */}
        </Card>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}
