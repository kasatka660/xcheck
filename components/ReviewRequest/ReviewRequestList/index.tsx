import React, { useEffect, useState } from "react";
import ReviewRequestModel from "../../../models/ReviewRequest.model";
import { Table, Tag, Space, Menu } from "antd";
import Link from "next/link";

const ReviewRequestList: React.FC = () => {
  const [allRequests, setRequestsArray] = useState<ReviewRequestModel[]>([]);

  useEffect(() => {
    fetch("http://localhost:3004/review-requests")
      .then((res) => res.json())
      .then((res) => setRequestsArray(res));
  }, []);

  const tableData = allRequests.map((item, key) => {
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
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "",
      render: (item) => {
        return (
          <Link href={`/cross-check?id=${item.id}`}>
            <a>Go To Cross Check</a>
          </Link>
        );
      },
    },
  ];

  return <Table columns={columns} dataSource={tableData} />;
};

export default ReviewRequestList;
