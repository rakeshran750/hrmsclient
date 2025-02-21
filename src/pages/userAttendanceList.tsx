import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import { UserAttendance } from 'src/sections/userAttendance/view/ua-view';


// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Pending Leave Request - ${CONFIG.appName}`}</title>
      </Helmet>

      <UserAttendance />
    </>
  );
}
