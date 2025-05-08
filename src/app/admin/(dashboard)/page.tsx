import { StackedRevenueChart } from "@/component/Charts";


export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>

     
      <StackedRevenueChart/>
    </div>
  );
}