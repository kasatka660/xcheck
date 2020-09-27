import React from "react";
import Layout from "../components/Layout";
import Authorization from "../components/Authorization";
import { useRouter } from "next/router";

const page: React.FC = () => {
  const router = useRouter();
  if (typeof window !== "undefined") {
    if (window.localStorage.getItem("user")) {
      return (
        <Layout withHeader={false}>
          <Authorization />
        </Layout>
      );
    } else {
      router.push("/").then();
    }
  } else {
    return <></>;
  }
};

export default page;
