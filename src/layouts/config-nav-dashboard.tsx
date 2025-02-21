import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navDataHr = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Employee',
    path: '/employees',
    icon: icon('ic-employee'),
  },
  {
    title: 'Leave Req',
    path: '/leavreq',
    icon: icon('ic-leave'),
    info: (
      <Label color="error" variant="inverted">
        +3
      </Label>
    ),
  },
  {
    title: 'Pay Roll',
    path: '/blog',
    icon: icon('ic-payroll'),
  },
  // {
  //   title: 'Sign in',
  //   path: '/sign-in',
  //   icon: icon('ic-lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic-disabled'),
  // },
];

export const navDataEmp = [
  // {
  //   title: 'Dashboard',
  //   path: '/',
  //   icon: icon('ic-analytics'),
  // },
  {
    title: 'Account',
    path: '/user/info',
    icon: icon('ic-employee'),
  },
  {
    title: 'Attendance',
    path: '/user/attendance',
    icon: icon('ic-payroll'),
    // info: (
    //   <Label color="error" variant="inverted">
    //     +3
    //   </Label>
    // ),
  },
  {
    title: 'Leave',
    path: '/user/leave',
    icon: icon('ic-leave'),
  },
  {
    title: 'Task',
    path: '/user/task',
    icon: icon('ic-task'),
  },
];
