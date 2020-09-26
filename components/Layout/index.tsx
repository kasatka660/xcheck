import React, { Fragment } from "react";
import { Header } from "../Header";

const Layout: React.FC<{ withHeader: boolean }> = ({
  children,
  withHeader,
}) => {
  return (
    <Fragment>
      {withHeader && <Header />}
<<<<<<< HEAD
      <div style={{ width: "1200px", margin: "50px auto" }}>{children}</div>
=======
      <div>{children}</div>
>>>>>>> origin/feature/Login
    </Fragment>
  );
};

export default Layout;
