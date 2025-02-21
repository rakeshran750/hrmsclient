import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { EmpView } from 'src/sections/user/view/employee-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Employees - ${CONFIG.appName}`}</title>
      </Helmet>
      <EmpView />
    </>
  );
}
