import React, { Fragment } from "react";
import { Header } from "../Header";

const Layout: React.FC<{ withHeader: boolean }> = ({
  children,
  withHeader,
}) => {
  return (
    <Fragment>
      {withHeader && <Header />}
      <div>{children}</div>
    </Fragment>
  );
};

export default Layout;
