// Stats page shows charts and numbers about your friendships
// Uses Recharts for the pie chart

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Static interaction data for the chart
const interactionData = [
  { name: 'Call',  value: 4, color: '#3b82f6' },
  { name: 'Text',  value: 3, color: '#f59e0b' },
  { name: 'Video', value: 3, color: '#8b5cf6' },
]

// Static friend health data
const healthData = [
  { label: 'On Track',    count: 3, total: 8, color: 'bg-green-500',  text: 'text-green-600'  },
  { label: 'Almost Due',  count: 2, total: 8, color: 'bg-yellow-400', text: 'text-yellow-600' },
  { label: 'Overdue',     count: 3, total: 8, color: 'bg-red-500',    text: 'text-red-600'    },
]

const Stats = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Friendship Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ── Pie Chart ── */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-1">By Interaction Type</h2>
          <p className="text-gray-400 text-xs mb-4">Breakdown of all logged interactions</p>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={interactionData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
              >
                {interactionData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend formatter={(value) => <span style={{ fontSize: 12, color: '#6b7280' }}>{value}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* ── Friendship Health ── */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-1">Friendship Health</h2>
          <p className="text-gray-400 text-xs mb-5">Overview of all friend statuses</p>
          <div className="space-y-5">
            {healthData.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className={`font-medium ${item.text}`}>{item.label}</span>
                  <span className="text-gray-500">{item.count} friends</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`${item.color} h-2 rounded-full`}
                    style={{ width: `${(item.count / item.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Quick Stats ── */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:col-span-2">
          <h2 className="font-semibold text-gray-900 mb-5">Quick Stats</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Total Interactions',     value: 10,  color: 'text-[#1e4d3b]' },
              { label: 'Friends Tracked',         value: 8,   color: 'text-blue-600'  },
              { label: 'Avg Days Since Contact',  value: 13,  color: 'text-purple-600'},
              { label: 'Overdue Friends',         value: 3,   color: 'text-red-500'   },
            ].map((stat) => (
              <div key={stat.label} className="bg-gray-50 rounded-xl p-4 text-center">
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Stats