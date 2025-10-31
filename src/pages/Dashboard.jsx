import { useEffect, useMemo, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts'
import { useAuth } from '../state/AuthContext.jsx'

function generateSeries(points = 8) {
  const out = []
  for (let i = 0; i < points; i++) {
    out.push({
      name: `W${i + 1}`,
      sales: Math.floor(Math.random() * 1000) + 100,
      expenses: Math.floor(Math.random() * 600) + 50,
    })
  }
  return out
}

function generatePie() {
  const cats = ['North', 'South', 'East', 'West']
  return cats.map((c) => ({ name: c, value: Math.floor(Math.random() * 400) + 100 }))
}

const PIE_COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444']

export default function Dashboard() {
  const { user } = useAuth()
  const [series, setSeries] = useState(() => generateSeries())
  const [pie, setPie] = useState(() => generatePie())
  const [auto, setAuto] = useState(true)

  const totalSales = useMemo(() => series.reduce((sum, d) => sum + d.sales, 0), [series])

  const refresh = () => {
    setSeries(generateSeries())
    setPie(generatePie())
  }

  useEffect(() => {
    if (!auto) return
    const id = setInterval(refresh, 5000)
    return () => clearInterval(id)
  }, [auto])

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Welcome, {user?.name}!</h2>
          <p className="muted">Total sales this period: ${totalSales.toLocaleString()}</p>
        </div>
        <div className="actions">
          <button className="btn" onClick={refresh}>Refresh Data</button>
          <label className="toggle">
            <input type="checkbox" checked={auto} onChange={(e) => setAuto(e.target.checked)} /> Auto-refresh
          </label>
        </div>
      </div>

      <div className="grid2">
        <div className="card">
          <h3>Sales vs Expenses</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={series}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={2} />
              <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3>Weekly Sales (Bar)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={series}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3>Regional Split (Pie)</h3>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie data={pie} dataKey="value" nameKey="name" outerRadius={100} label>
              {pie.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}


