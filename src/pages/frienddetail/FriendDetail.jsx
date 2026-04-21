import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import { useTimeline } from '../../context/TimelineContext'  // ← add this

const FriendDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addEntry } = useTimeline()   // ← get addEntry from context

  const [friend, setFriend]           = useState(null)
  const [loading, setLoading]         = useState(true)
  const [goal, setGoal]               = useState(0)
  const [editingGoal, setEditingGoal] = useState(false)
  const [tempGoal, setTempGoal]       = useState(0)

  useEffect(() => {
    fetch('/friends.json')
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((f) => f.id === parseInt(id))
        setFriend(found)
        setGoal(found?.goal || 14)
        setTempGoal(found?.goal || 14)
        setLoading(false)
      })
  }, [id])

  // Now this saves to global context — Timeline and Stats will update
  const handleCheckIn = (type) => {
    const label = type.charAt(0).toUpperCase() + type.slice(1)

    // This adds to the global entries list in TimelineContext
    addEntry(type, friend.id, friend.name)

    // Show toast notification
    toast.success(`${label} with ${friend.name} logged!`, {
      style: { borderRadius: '12px' },
    })
  }

  const statusClass = {
    'overdue':    'status-overdue',
    'almost due': 'status-almost-due',
    'on-track':   'status-on-track',
  }
  const statusLabel = {
    'overdue':    'Overdue',
    'almost due': 'Almost Due',
    'on-track':   'On Track',
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="w-10 h-10 border-4 border-green-200 border-t-[#1e4d3b] rounded-full spinner" />
      </div>
    )
  }

  if (!friend) {
    return (
      <div className="text-center py-20 text-gray-500">
        Friend not found.{' '}
        <button onClick={() => navigate('/')} className="text-[#1e4d3b] underline">
          Go home
        </button>
      </div>
    )
  }

  const formattedDate = new Date(friend.next_due_date).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 text-sm font-medium"
      >
        <i className="fa-solid fa-arrow-left text-xs"></i>
        Back to Friends
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* LEFT: Profile info */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex flex-col items-center text-center mb-5">
              <img
                src={friend.picture}
                alt={friend.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-green-100 mb-3"
              />
              <h1 className="text-2xl font-bold text-gray-900">{friend.name}</h1>
              <span className={`mt-2 text-xs font-semibold px-3 py-1 rounded-full ${statusClass[friend.status]}`}>
                {statusLabel[friend.status]}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <i className="fa-regular fa-envelope text-gray-400"></i>
              <span>{friend.email}</span>
            </div>

            <div className="flex items-start gap-2 mb-4">
              <i className="fa-solid fa-tag text-gray-400 mt-0.5 text-sm"></i>
              <div className="flex flex-wrap gap-1">
                {friend.tags.map((tag) => (
                  <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <p className="bg-gray-50 rounded-xl p-3 text-sm text-gray-600 leading-relaxed mb-5">
              {friend.bio}
            </p>

            <div className="space-y-2">
              <button className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-yellow-50 text-sm font-medium">
                <i className="fa-regular fa-clock text-yellow-500"></i>
                Snooze 2 Weeks
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-blue-50 text-sm font-medium">
                <i className="fa-solid fa-box-archive text-blue-500"></i>
                Archive
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-100 text-red-500 hover:bg-red-50 text-sm font-medium">
                <i className="fa-solid fa-trash"></i>
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: Stats, Goal, Check-in */}
        <div className="lg:col-span-3 space-y-4">

          {/* Three stat cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
              <p className="text-2xl font-bold text-[#1e4d3b]">{friend.days_since_contact}</p>
              <p className="text-gray-500 text-xs mt-1">Days Since Contact</p>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
              <p className="text-2xl font-bold text-blue-600">{goal}</p>
              <p className="text-gray-500 text-xs mt-1">Goal (days)</p>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
              <p className="text-base font-bold text-gray-700">{formattedDate}</p>
              <p className="text-gray-500 text-xs mt-1">Next Due Date</p>
            </div>
          </div>

          {/* Relationship Goal */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 text-sm">Relationship Goal</h3>
              <button
                onClick={() => setEditingGoal(!editingGoal)}
                className="text-xs text-[#1e4d3b] font-medium flex items-center gap-1"
              >
                <i className="fa-solid fa-pen text-xs"></i> Edit
              </button>
            </div>
            {editingGoal ? (
              <div className="flex items-center gap-3">
                <p className="text-sm text-gray-500">Contact every</p>
                <input
                  type="number"
                  value={tempGoal}
                  onChange={(e) => setTempGoal(parseInt(e.target.value) || 1)}
                  className="w-16 border border-gray-200 rounded-lg px-2 py-1 text-sm text-center focus:outline-none focus:ring-2 focus:ring-green-400"
                  min={1}
                />
                <p className="text-sm text-gray-500">days</p>
                <button
                  onClick={() => { setGoal(tempGoal); setEditingGoal(false); toast.success('Goal updated!') }}
                  className="bg-[#1e4d3b] text-white px-3 py-1 rounded-lg text-xs font-medium"
                >
                  Save
                </button>
              </div>
            ) : (
              <p className="text-sm text-gray-600">
                Connect every <span className="font-semibold text-[#1e4d3b]">{goal} days</span>
              </p>
            )}
          </div>

          {/* Quick Check-In */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <h3 className="font-semibold text-gray-900 text-sm mb-4">Quick Check-In</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { type: 'call',  icon: 'fa-solid fa-phone',   color: 'hover:bg-blue-50   text-blue-600'   },
                { type: 'text',  icon: 'fa-solid fa-message', color: 'hover:bg-yellow-50 text-yellow-600' },
                { type: 'video', icon: 'fa-solid fa-video',   color: 'hover:bg-purple-50 text-purple-600' },
              ].map((item) => (
                <button
                  key={item.type}
                  onClick={() => handleCheckIn(item.type)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 text-gray-500 ${item.color}`}
                >
                  <i className={`${item.icon} text-lg`}></i>
                  <span className="text-xs font-medium capitalize">{item.type}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default FriendDetail