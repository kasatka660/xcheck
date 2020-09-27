import React, { useEffect, useState } from "react";
import { serverBaseUrl } from "../constants/config";
import Link from "next/link";
import { Table } from "antd";
import CrossCheckModel from "../models/CrossCheck.model";
import Layout from "../components/Layout";

const page: React.FC = () => {
  const [allReviews, setReviewsArray] = useState<CrossCheckModel[]>([]);

  useEffect(() => {
    fetch(serverBaseUrl + "/cross-checks")
      .then((res) => res.json())
      .then((res) => setReviewsArray(res));
  }, []);

  const tableData = allReviews.map((item, key) => {
    item["key"] = key;
    return item;
  });

  const columns = [
    {
      title: "Task",
      dataIndex: "task",
      key: "task",
    },
    {
      title: "Student",
      dataIndex: "student",
      key: "student",
    },
    {
      title: "Reviewer",
      dataIndex: "reviewer",
      key: "reviewer",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "",
      render: (item) => {
        return (
          <Link href={`/cross-check/${item.id}`}>
            <a></a>
          </Link>
        );
      },
    },
  ];

  return (
    <Layout withHeader={true}>
      <h1>Reviews</h1>
      <Table columns={columns} dataSource={tableData} />
    </Layout>
  );
};

export default page;
