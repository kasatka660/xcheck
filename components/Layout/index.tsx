import React, { Fragment } from "react";
import { Header } from "../Header";

const Layout: React.FC<{ withHeader: boolean }> = ({
  children,
  withHeader,
}) => {
  return (
    <Fragment>
      {withHeader && <Header />}
      <div style={{ width: "1200px", margin: "50px auto" }}>{children}</div>
    </Fragment>
  );
};

export default Layout;
