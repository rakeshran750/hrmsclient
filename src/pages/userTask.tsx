import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { BlogView } from 'src/sections/userTask/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Blog - ${CONFIG.appName}`}</title>
      </Helmet>

      <BlogView />
    </>
  );
}
