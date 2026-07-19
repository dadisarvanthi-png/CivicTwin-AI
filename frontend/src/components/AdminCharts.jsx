import { useEffect, useState } from "react";
import api from "../api/api";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function AdminCharts() {
  const [categoryData, setCategoryData] = useState([]);
  const [priorityData, setPriorityData] = useState([]);

  useEffect(() => {
    fetchCharts();
  }, []);

  const fetchCharts = async () => {
    try {
      const categories = await api.get("/dashboard/categories");
      const priorities = await api.get("/dashboard/priorities");

      setCategoryData(categories.data);
      setPriorityData(priorities.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "40px",
        marginTop: "40px",
      }}
    >
      <div>
        <h2>Complaints by Category</h2>

        <Bar
          data={{
            labels: categoryData.map((i) => i.category),
            datasets: [
              {
                label: "Complaints",
                data: categoryData.map((i) => i.count),
              },
            ],
          }}
        />
      </div>

      <div>
        <h2>Priority Distribution</h2>

        <Pie
          data={{
            labels: priorityData.map((i) => i.priority),
            datasets: [
              {
                data: priorityData.map((i) => i.count),
              },
            ],
          }}
        />
      </div>
    </div>
  );
}

export default AdminCharts;