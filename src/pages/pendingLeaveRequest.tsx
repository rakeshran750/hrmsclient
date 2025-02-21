import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { PendLeaves } from 'src/sections/pendingLeaves/view/pl-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Pending Leave Request - ${CONFIG.appName}`}</title>
      </Helmet>

      <PendLeaves />
    </>
  );
}
