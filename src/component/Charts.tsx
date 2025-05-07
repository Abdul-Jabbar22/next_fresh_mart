"use client";
import {
  BarChart,
  LineChart,
  PieChart,
  Bar,
  Line,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const salesData = [
  { name: "Jan", revenue: 4000, orders: 2400 },
  { name: "Feb", revenue: 3000, orders: 1398 },
  { name: "Mar", revenue: 2000, orders: 9800 },
  { name: "Apr", revenue: 2780, orders: 3908 },
  { name: "May", revenue: 1890, orders: 4800 },
  { name: "Jun", revenue: 2390, orders: 3800 },
];

export function StackedRevenueChart() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-semibold mb-4">Revenue vs Expenses</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" stackId="a" fill="#8884d8" name="Revenue" />
            <Bar dataKey="orders" stackId="a" fill="#82ca9d" name="Expenses" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
const performanceData = [
  {
    subject: "Revenue",
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: "Orders",
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "Customers",
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "Satisfaction",
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: "Retention",
    A: 85,
    B: 90,
    fullMark: 150,
  },
];
const heatmapData = [
  { day: "Monday", hour: "8-10", value: 10 },
  { day: "Monday", hour: "10-12", value: 25 },
  { day: "Monday", hour: "12-14", value: 35 },
  { day: "Monday", hour: "14-16", value: 30 },
  { day: "Tuesday", hour: "8-10", value: 15 },
  { day: "Tuesday", hour: "10-12", value: 30 },
  { day: "Tuesday", hour: "12-14", value: 40 },
  { day: "Tuesday", hour: "14-16", value: 35 },
  // Add more data for other days...
];
