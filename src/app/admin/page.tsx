"use client";

import React, {useEffect, useRef, useState} from "react";
import "../globals.css";
import Navbar from "@/components/Navbar/Navbar";
import {AiOutlineDown} from "react-icons/ai";
import {SlGraph} from "react-icons/sl";
import {ChartData, ChartOptions} from "chart.js";
import {Line} from "react-chartjs-2";
import {CategoryScale, TimeScale} from "chart.js";
import Chart from "chart.js/auto";
import "chartjs-adapter-moment";
import {ColumnDef} from "@tanstack/react-table";
import DataTable from "@/components/DataTable/DataTable";

Chart.register(CategoryScale, TimeScale);
type SidebarData = {
  title: string;
  logo?: React.ReactNode;
};

const sidebarDatas: SidebarData[] = [
  {
    title: "Products",
  },
  {
    logo: <SlGraph />,
    title: "Statistics",
  },
  {
    title: "Orders",
  },
  {
    title: "Settings",
  },
];

const SidebarItem: React.FC<SidebarData> = (props) => {
  const [expandSubdata, setExpandSubdata] = useState(false);

  return (
    <div className="w-full flex flex-col justify-between">
      <div className="flex flex-row items-center gap-x-2 w-full">
        <span className="text-2xl">{props.logo}</span>
        <span>{props.title}</span>
      </div>
    </div>
  );
};

type StatsBoxData = {
  title: string;
  content: React.ReactNode;
  className?: string | "";
  titleClass?: string | "";
  contentClass?: string | "";
};

const StatisticBox: React.FC<StatsBoxData> = (props) => {
  return (
    <div
      className={`flex flex-col border border-gray-400 p-4 w-full ${props.className}`}
    >
      <span className={`${props.titleClass}`}>{props.title}</span>
      <span className={`text-2xl font-bold h-full ${props.contentClass}`}>
        {props.content}
      </span>
    </div>
  );
};

const STATS_BOX_CONTENT: StatsBoxData[] = [
  {
    title: "Total Sales",
    content: "$ 10,000.00",
  },
  {
    title: "Total Orders",
    content: "300",
  },
];

interface Order {
  orderID: string;
  firstName: string;
  lastName: string;
  total: number;
  status: string;
}

const Statistics = () => {
  const datasets: ChartData<"line", {x: string; y: number}[]> = {
    datasets: [
      {
        data: [
          {x: "2023-01-01", y: 50},
          {x: "2023-01-15", y: 55.7},
          {x: "2023-02-01", y: 60.5},
          {x: "2023-02-14", y: 70.4},
          {x: "2023-03-01", y: 75},
          {x: "2023-03-15", y: 62.1},
          {x: "2023-04-01", y: 80.25},
          {x: "2023-04-15", y: 75.5},
          {x: "2023-05-01", y: 85},
          {x: "2023-05-15", y: 80.8},
          {x: "2023-06-01", y: 70.02},
          {x: "2023-06-15", y: 95.3},
          {x: "2023-07-01", y: 100.2},
          {x: "2023-07-15", y: 105.6},
          {x: "2023-08-01", y: 90.0},
          {x: "2023-08-15", y: 80.25},
          {x: "2023-09-01", y: 74.0},
          {x: "2023-09-15", y: 60.25},
          {x: "2023-10-01", y: 72.03},
          {x: "2023-10-15", y: 80.0},
        ],
        borderColor: "#000000",
        tension: 0.2,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "month",
          parser: "YYYY-MM-DD",
        },
        display: true,
        title: {
          display: true,
          text: "Month",
        },
      },
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const columns: ColumnDef<Order>[] = [
    {
      header: "Order ID",
      cell: (row) => row.renderValue(),
      accessorKey: "orderID",
    },
    {
      header: "First Name",
      cell: (row) => row.renderValue(),
      accessorKey: "firstName",
    },
    {
      header: "Last Name",
      cell: (row) => row.renderValue(),
      accessorKey: "lastName",
    },
    {
      header: "Total",
      cell: (row) => row.renderValue(),
      accessorKey: "total",
    },
    {
      header: "Status",
      cell: (row) => row.renderValue(),
      accessorKey: "status",
    },
  ];

  const data: Order[] = [
    {
      orderID: "123",
      firstName: "John",
      lastName: "Doe",
      total: 150,
      status: "Completed",
    },
    {
      orderID: "123",
      firstName: "John",
      lastName: "Doe",
      total: 150,
      status: "Completed",
    },
    {
      orderID: "123",
      firstName: "John",
      lastName: "Doe",
      total: 150,
      status: "Completed",
    },
    {
      orderID: "123",
      firstName: "John",
      lastName: "Doe",
      total: 150,
      status: "Completed",
    },
    {
      orderID: "123",
      firstName: "John",
      lastName: "Doe",
      total: 150,
      status: "Completed",
    },
    {
      orderID: "123",
      firstName: "John",
      lastName: "Doe",
      total: 150,
      status: "Completed",
    },
    {
      orderID: "123",
      firstName: "John",
      lastName: "Doe",
      total: 150,
      status: "Completed",
    },
    {
      orderID: "123",
      firstName: "John",
      lastName: "Doe",
      total: 150,
      status: "Completed",
    },

    // More rows...
  ];

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-5">
      <StatisticBox {...STATS_BOX_CONTENT[0]} />
      <StatisticBox {...STATS_BOX_CONTENT[1]} />
      <StatisticBox
        title="Sales Trends"
        content={<Line options={options} data={datasets} />}
        className="col-span-2 w-full h-[600px] flex"
      />

      <StatisticBox
        className="col-span-2"
        title="Recent Order"
        content={<DataTable data={data} columns={columns} />}
      />
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="h-full w-full border-r flex flex-col p-10">
      <div className="flex flex-col gap-y-7">
        {sidebarDatas.map((data, index) => (
          <SidebarItem key={index} {...data} />
        ))}
      </div>
    </div>
  );
};

const Admin = () => {
  
  return (
    <div className="relative h-screen overflow-hidden w-full grid grid-cols-[300px_1fr] grid-rows-[min-content_1fr]">
      <div className="px-10 py-8 border-r relative z-20 border-b">ESSENTIA</div>
      <main className="p-10 pt-20 row-span-2 overflow-auto">
        <Statistics />
      </main>
      <div className="w-full">
        <Sidebar />
      </div>
    </div>
  );
};

export default Admin;
