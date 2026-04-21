// Homepage shows the banner, summary stats, and the friends grid
// It fetches friends.json from the public folder using useEffect

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

const Homepage = () => {
  // friends holds the list loaded from JSON
  const [friends, setFriends] = useState([])
  // loading is true while data is being fetched
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  // useEffect runs once when the page first loads
  useEffect(() => {
    // Fetch the JSON file from the public folder
    fetch('/friends.json')
      .then((res) => res.json())
      .then((data) => {
        setFriends(data)
        setLoading(false)
      })
  }, [])

  // Count friends by status for the summary cards
  const total      = friends.length
  const onTrack    = friends.filter((f) => f.status === 'on-track').length
  const needHelp   = friends.filter((f) => f.status !== 'on-track').length
  const interactions = 12 // static number for demo

  // Color class based on status value
  const getStatusClass = (status) => {
    if (status === 'overdue')    return 'status-overdue'
    if (status === 'almost due') return 'status-almost-due'
    return 'status-on-track'
  }

  const getStatusLabel = (status) => {
    if (status === 'overdue')    return 'Overdue'
    if (status === 'almost due') return 'Almost Due'
    return 'On Track'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* ── Banner ── */}
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
          Friends to keep close in your life
        </h1>
        <p className="text-gray-500 text-base max-w-xl mx-auto mb-6">
          Your personal tool to keep tight connections. Browse, text, and nurture
          the relationships that make life more rich.
        </p>
        <button className="inline-flex items-center gap-2 bg-[#1e4d3b] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[#163829]">
          <i className="fa-solid fa-plus text-sm"></i>
          Add a Friend
        </button>
      </div>

      {/* ── Show spinner while loading ── */}
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
          <div className="w-10 h-10 border-4 border-green-200 border-t-[#1e4d3b] rounded-full spinner" />
          <p className="text-gray-500 text-sm">Loading your friends...</p>
        </div>
      ) : (
        <>
          {/* ── Summary Cards ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {[
              { label: 'Total Friends',          value: total,         color: 'text-[#1e4d3b]' },
              { label: 'On Track',               value: onTrack,       color: 'text-green-600'  },
              { label: 'Need Attention',          value: needHelp,      color: 'text-red-500'    },
              { label: 'Interactions This Month', value: interactions,  color: 'text-blue-600'   },
            ].map((card) => (
              <div key={card.label} className="bg-white rounded-2xl p-5 border border-gray-100 text-center">
                <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
                <p className="text-gray-500 text-xs mt-1">{card.label}</p>
              </div>
            ))}
          </div>

          {/* ── Friends Grid ── */}
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Friends</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {friends.map((friend, index) => (
              <div
                key={friend.id}
                onClick={() => navigate(`/friend/${friend.id}`)}
                className={`bg-white rounded-2xl p-4 cursor-pointer card-hover border border-gray-100 fade-in-up fade-in-up-${Math.min(index + 1, 8)}`}
              >
                <div className="flex flex-col items-center text-center gap-2">
                  {/* Profile photo */}
                  <img
                    src={friend.picture}
                    alt={friend.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
                  />
                  {/* Name and days */}
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{friend.name}</h3>
                    <p className="text-gray-400 text-xs mt-0.5">{friend.days_since_contact} days ago</p>
                  </div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 justify-center">
                    {friend.tags.map((tag) => (
                      <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {/* Status badge */}
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusClass(friend.status)}`}>
                    {getStatusLabel(friend.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Homepage