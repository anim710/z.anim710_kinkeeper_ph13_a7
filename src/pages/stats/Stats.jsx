import { PieChart, Pie, Cell,Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useTimeline } from '../../context/TimelineContext'

const Stats = () => {
  const { entries } = useTimeline()

  const callCount  = entries.filter((e) => e.type === 'call').length
  const textCount  = entries.filter((e) => e.type === 'text').length
  const videoCount = entries.filter((e) => e.type === 'video').length

  const pieData = [
    { name: 'Text',  value: textCount,  color: '#8b5cf6' },
    { name: 'Call',  value: callCount,  color: '#1e4d3b' },
    { name: 'Video', value: videoCount, color: '#22c55e' },
  ].filter((item) => item.value > 0)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      <h1 className="text-4xl font-bold text-gray-900 mb-8">Friendship Analytics</h1>

      {/* Centered card */}
      <div className="flex justify-center">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 w-full max-w-xl">
          <h2 className="font-semibold text-gray-800 mb-6 text-center">By Interaction Type</h2>

          {pieData.length === 0 ? (
            <div className="h-72 flex flex-col items-center justify-center gap-2">
              <i className="fa-solid fa-chart-pie text-gray-200 text-5xl mb-2"></i>
              <p className="text-gray-400 text-sm">No interactions logged yet.</p>
              <p className="text-gray-300 text-xs">Go to a friend and log a Call, Text, or Video.</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
  <Pie
    data={pieData}
    cx="50%"
    cy="50%"
    innerRadius={80}
    outerRadius={120}
    paddingAngle={4}
    dataKey="value"
  >
    {pieData.map((entry, index) => (
      <Cell key={index} fill={entry.color} />
    ))}
  </Pie>
  <Tooltip
    formatter={(value, name) => [value, name]}
    contentStyle={{
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      fontSize: '13px',
      color: '#374151',
    }}
  />
  <Legend
    iconType="circle"
    iconSize={8}
    formatter={(value) => (
      <span style={{ fontSize: 13, color: '#6b7280' }}>{value}</span>
    )}
  />
</PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

    </div>
  )
}

export default Stats