import { useState } from 'react'
import { useTimeline } from '../../context/TimelineContext'  // ← add this

const Timeline = () => {
  const { entries } = useTimeline()   // ← read global entries
  const [filter, setFilter] = useState('all')
  const [sort, setSort]     = useState('newest')

  // Filter and sort the global entries
  const filtered = entries
    .filter((e) => filter === 'all' || e.type === filter)
    .sort((a, b) =>
      sort === 'newest'
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    )

  const typeStyle = {
    call:  { icon: 'fa-solid fa-phone',   color: 'bg-blue-100   text-blue-600',   label: 'Call'  },
    text:  { icon: 'fa-solid fa-message', color: 'bg-yellow-100 text-yellow-600', label: 'Text'  },
    video: { icon: 'fa-solid fa-video',   color: 'bg-purple-100 text-purple-600', label: 'Video' },
  }

  const filterOptions = [
    { value: 'all',   label: 'All',   icon: 'fa-solid fa-filter'  },
    { value: 'call',  label: 'Calls', icon: 'fa-solid fa-phone'   },
    { value: 'text',  label: 'Texts', icon: 'fa-solid fa-message' },
    { value: 'video', label: 'Video', icon: 'fa-solid fa-video'   },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Timeline</h1>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="text-sm border border-gray-200 rounded-xl px-3 py-2 bg-white text-gray-600 focus:outline-none"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium border ${
              filter === option.value
                ? 'bg-[#1e4d3b] text-white border-[#1e4d3b]'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
            }`}
          >
            <i className={`${option.icon} text-xs`}></i>
            {option.label}
          </button>
        ))}
      </div>

      {/* Entries list or empty state */}
      <div className="bg-white rounded-2xl border border-gray-100 px-5">
        {filtered.length === 0 ? (
          <div className="py-14 text-center">
            <i className="fa-regular fa-clock text-gray-200 text-5xl mb-3"></i>
            <p className="text-gray-400 text-sm">
              {entries.length === 0
                ? 'No interactions yet. Go to a friend and log a Call, Text, or Video!'
                : 'No entries match this filter.'}
            </p>
          </div>
        ) : (
          filtered.map((entry) => {
            const style = typeStyle[entry.type]
            const date  = new Date(entry.date).toLocaleDateString('en-US', {
              month: 'long', day: 'numeric', year: 'numeric',
            })
            return (
              <div key={entry.id} className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${style.color}`}>
                  <i className={`${style.icon} text-sm`}></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{entry.title}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{date}</p>
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${style.color}`}>
                  {style.label}
                </span>
              </div>
            )
          })
        )}
      </div>

      <p className="text-center text-gray-400 text-xs mt-4">
        {filtered.length} interaction{filtered.length !== 1 ? 's' : ''} shown
      </p>
    </div>
  )
}

export default Timeline