"use client";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import * as Yup from "yup";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

interface Transaction {
  type: "income" | "expense";
  description: string;
  amount: number;
  date: string;
}

const Dashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTransactions = localStorage.getItem("transactions");
      if (storedTransactions) setTransactions(JSON.parse(storedTransactions));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  const updateTransaction = (
    index: number,
    updatedTransaction: Transaction
  ) => {
    setTransactions((prev) =>
      prev.map((t, i) => (i === index ? updatedTransaction : t))
    );
    setEditingIndex(null);
  };

  const removeTransaction = (index: number) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      setTransactions((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const filteredTransactions = transactions.filter(
    (t) =>
      (filter === "all" || t.type === filter) &&
      t.description.toLowerCase().includes(search.toLowerCase())
  );

  const incomeTotal = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const expenseTotal = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const profitLoss = incomeTotal - expenseTotal;

  const chartData = {
    labels: transactions.map((t) => t.date),
    datasets: [
      {
        label: "Expenses",
        data: transactions
          .filter((t) => t.type === "expense")
          .map((t) => t.amount),
        backgroundColor: "#f87171",
      },
      {
        label: "Income",
        data: transactions
          .filter((t) => t.type === "income")
          .map((t) => t.amount),
        borderColor: "#22c55e",
        backgroundColor: "#22c55e",
        fill: false,
      },
    ],
  };

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Expense Tracker Dashboard
      </h1>
      <div className="bg-gray-700 p-4 rounded-lg mb-6 w-full max-w-lg mx-auto text-center">
        <h2 className="text-xl font-medium">Summary</h2>
        <p>
          Total Income: <span className="text-green-400">${incomeTotal}</span>
        </p>
        <p>
          Total Expenses: <span className="text-red-400">${expenseTotal}</span>
        </p>
        <p>
          Profit/Loss:{" "}
          <span className={profitLoss >= 0 ? "text-green-400" : "text-red-400"}>
            ${profitLoss}
          </span>
        </p>
      </div>

      <Formik
        initialValues={{
          type: "income",
          description: "",
          amount: "",
          date: "",
        }}
        validationSchema={Yup.object({
          description: Yup.string().required("Description is required"),
          amount: Yup.number()
            .positive("Amount must be positive")
            .required("Amount is required"),
          date: Yup.string().required("Date is required"),
        })}
        onSubmit={(values, { resetForm }) => {
          if (editingIndex !== null) {
            updateTransaction(editingIndex, {
              ...values,
              amount: Number(values.amount),
            } as Transaction);
          } else {
            addTransaction({
              ...values,
              amount: Number(values.amount),
            } as Transaction);
          }
          resetForm();
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Form
            onSubmit={handleSubmit}
            className="bg-gray-700 p-4 rounded-lg mb-6 w-full max-w-lg mx-auto"
          >
            <h2 className="text-xl font-medium mb-4 text-center">
              Add / Edit Transaction
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <select
                name="type"
                value={values.type}
                onChange={handleChange}
                className="p-2 bg-gray-900 rounded"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={values.description}
                onChange={handleChange}
                className="p-2 bg-gray-900 rounded"
              />
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={values.amount}
                onChange={handleChange}
                className="p-2 bg-gray-900 rounded"
              />
              <input
                type="date"
                name="date"
                value={values.date}
                onChange={handleChange}
                className="p-2 bg-gray-900 rounded"
              />
              <button
                type="submit"
                className="bg-blue-600 p-2 rounded text-white"
              >
                {editingIndex !== null ? "Update" : "Add"}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <div className="bg-gray-700 p-6 rounded-lg mb-6 flex-row w-full max-w-lg mx-auto">
        <h2 className="text-xl font-medium mb-4 text-center">
          Transaction Chart
        </h2>
        <Bar data={chartData} />
      </div>

      <div className="bg-gray-700 p-4 rounded-lg mb-6 w-full max-w-lg mx-auto">
        <h2 className="text-xl font-medium mb-4 text-center">
          Transaction List
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr>
                <th className="p-2">Date</th>
                <th className="p-2">Type</th>
                <th className="p-2">Description</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction, index) => (
                <tr key={index} className="border-t border-gray-600">
                  <td className="p-2">{transaction.date}</td>
                  <td className="p-2 capitalize">{transaction.type}</td>
                  <td className="p-2">{transaction.description}</td>
                  <td
                    className={`p-2 ${
                      transaction.type === "income"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    ${transaction.amount}
                  </td>
                  <td className="p-2">
                    <button
                      className="bg-blue-600 p-1 rounded mr-2"
                      onClick={() => setEditingIndex(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 p-1 rounded"
                      onClick={() => removeTransaction(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
