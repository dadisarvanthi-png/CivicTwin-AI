import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", complaints: 40 },
  { month: "Feb", complaints: 55 },
  { month: "Mar", complaints: 32 },
  { month: "Apr", complaints: 60 },
  { month: "May", complaints: 80 },
  { month: "Jun", complaints: 48 },
];

function AnalyticsChart() {
  return (
    <div
      style={{
        background: "white",
        padding: "25px",
        borderRadius: "12px",
        marginTop: "30px",
      }}
    >
      <h2>Monthly Citizen Complaints</h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="complaints" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AnalyticsChart;