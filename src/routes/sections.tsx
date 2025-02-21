import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { varAlpha } from 'src/theme/styles';
import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('src/pages/home'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserTask = lazy(() => import('src/pages/userTask'));
export const UserInfoPage = lazy(() => import('src/pages/userinfo'));
export const UserPage = lazy(() => import('src/pages/user'));
export const EmployeesPage = lazy(() => import('src/pages/employees'));
export const PendingLeaveRequestPage = lazy(() => import('src/pages/pendingLeaveRequest'));
export const UserLeaveListPage = lazy(() => import('src/pages/userLeaveList '));
export const UserAttendanceListPage = lazy(() => import('src/pages/userAttendanceList'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

const dashBoradData = [
  { element: <HomePage />, index: true },
  { path: 'employees', element: <EmployeesPage /> },
  { path: 'leavreq', element: <PendingLeaveRequestPage /> },
  { path: 'user/leave', element: <UserLeaveListPage /> },
  { path: 'user/info', element: <UserInfoPage /> },
  { path: 'user/attendance', element: <UserAttendanceListPage /> },
  { path: 'user/task', element: <UserTask /> },
  { path: 'blog', element: <BlogPage /> },
]


export function Router() {
  return useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={renderFallback}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),

      children: dashBoradData
    },

    {
      path: 'sign-in',
      element: (
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      ),
    },
    { 
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
