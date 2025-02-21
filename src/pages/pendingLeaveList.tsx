import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { PendLeaves } from 'src/sections/pendingLeaves/view/pl-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Employees - ${CONFIG.appName}`}</title>
      </Helmet>
      <PendLeaves />
    </>
  );
}
