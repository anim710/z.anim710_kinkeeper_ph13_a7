// Timeline shows all past interactions — calls, texts, videos
// Users can filter by type and sort by date

import { useState } from 'react'

// Some starter entries so the page isn't empty on first load
const starterEntries = [
  { id: 1, type: 'call',   friendName: 'Sarah Mitchell', title: 'Call with Sarah Mitchell',  date: '2026-04-11' },
  { id: 2, type: 'text',   friendName: 'Emma Wilson',    title: 'Text with Emma Wilson',      date: '2026-04-05' },
  { id: 3, type: 'video',  friendName: 'Lisa Nakamura',  title: 'Video with Lisa Nakamura',   date: '2026-03-29' },
  { id: 4, type: 'call',   friendName: 'Omar Hassan',    title: 'Call with Omar Hassan',      date: '2026-04-09' },
  { id: 5, type: 'text',   friendName: 'Priya Sharma',   title: 'Text with Priya Sharma',     date: '2026-04-03' },
  { id: 6, type: 'video',  friendName: 'Carlos Rivera',  title: 'Video with Carlos Rivera',   date: '2026-03-17' },
  { id: 7, type: 'call',   friendName: 'James Wright',   title: 'Call with James Wright',     date: '2026-04-13' },
  { id: 8, type: 'text',   friendName: 'David Kim',      title: 'Text with David Kim',        date: '2026-03-22' },
]

const Timeline = () => {
  const [filter, setFilter] = useState('all')
  const [sort, setSort]     = useState('newest')

  // Filter entries based on selected type
  const filtered = starterEntries
    .filter((e) => filter === 'all' || e.type === filter)
    .sort((a, b) => {
      // Sort by date
      return sort === 'newest'
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    })

  // Icon and color for each type
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

      {/* Header */}
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

      {/* Timeline list */}
      <div className="bg-white rounded-2xl border border-gray-100 px-5">
        {filtered.length === 0 ? (
          <p className="py-14 text-center text-gray-400 text-sm">No entries for this filter.</p>
        ) : (
          filtered.map((entry) => {
            const style = typeStyle[entry.type]
            const date  = new Date(entry.date).toLocaleDateString('en-US', {
              month: 'long', day: 'numeric', year: 'numeric',
            })
            return (
              <div key={entry.id} className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0">
                {/* Icon circle */}
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${style.color}`}>
                  <i className={`${style.icon} text-sm`}></i>
                </div>
                {/* Title and date */}
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{entry.title}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{date}</p>
                </div>
                {/* Type badge */}
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