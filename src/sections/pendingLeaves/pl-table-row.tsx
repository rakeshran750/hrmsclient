import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import api from 'src/utils/api';
import { ToastContainer, toast } from 'react-toastify';

// ----------------------------------------------------------------------

export type UserProps = {
  id: string;
  name: string;
  role: string;
  status: string;
  company: string;
  avatarUrl: string;
  isVerified: boolean;
};

type UserTableRowProps = {
  row: any;
  selected: boolean;
  onSelectRow: () => void;
};

export function UserTableRow({ row, selected, onSelectRow }: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const notify = (x: any) => toast(x);

  const handelApproveLeave = (row:any) => {
    const approveLeave = async () => {
      let leaveData = {
        "leaveId": row._id,
        "leaveStatus": "approved",
        "approvalComments": "hello"
      }
      let { data } = await api.put('leave/approve/', leaveData)
      if (data.success) {
        notify("Leave Approved!")
        handleClosePopover()
      } else {
        notify("Error in leave !XXXXX")
      }
    }
    approveLeave()
  }

  const handelRejectLeave = (row: any) => {
    const rejectLeave = async () => {
      let leaveData = {
        "leaveId": row._id,
        "leaveStatus": "rejected",
        "approvalComments": "hello"
      }
      let { data } = await api.put('/leave/approve/', leaveData)
      if (data.success) {
        notify("Leave Rejected")
        handleClosePopover()
      } else {
        notify("Error in leave !XXXXX")
      }
    }
    rejectLeave()
  }

  
  const HanldeDelteUser = async (id:any) => {
    let { data } = await api.delete(`/employees/${id}`)
    if (data.success) {
      notify("Employee Delted Successfully")
    } else {
      notify("Employee Delted Unsuccessfull!XXXXX")
    }
  }

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
            <Avatar alt={row.name} src={row.avatarUrl} />
            {row.employee_id.firstName}
          </Box>
        </TableCell>
        <TableCell>{row.dateApplied.split('T')[0]}</TableCell>
        <TableCell>{row.leaveFrom}</TableCell>
        <TableCell>{row.leaveUpTo}</TableCell>
        <TableCell>
          <Label color={'success'}>{row.leaveStatus}</Label>
        </TableCell>  
        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem onClick={() => handelApproveLeave(row)}>
            <Iconify icon="solar:check-circle-bold" />
            Approve
          </MenuItem>
          <MenuItem onClick={() => handelRejectLeave(row)}>
            <Iconify icon="solar:close-circle-bold" />
            Reject
          </MenuItem>
        </MenuList>
      </Popover>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ marginTop: '55px' }}
      />
      
    </>
  );
}
