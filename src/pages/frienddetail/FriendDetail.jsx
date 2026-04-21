// FriendDetail shows full info about one friend
import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';

const FriendDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [friend, setFriend] = useState(null);
  const [loading, setLoading] = useState(true);
  const [goal, setGoal] = useState(14);
  const [editingGoal, setEditingGoal] = useState(false);
  const [tempGoal, setTempGoal] = useState(14);
  const [timeline, setTimeline] = useState([]);

  // Counter for generating unique IDs (clean & stable)
  const entryIdCounter = useRef(1000);

  // Load friend data
  useEffect(() => {
    fetch('/friends.json')
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((f) => f.id === parseInt(id));
        if (found) {
          setFriend(found);
          setGoal(found.goal || 14);
          setTempGoal(found.goal || 14);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // Handle check-in (Call, Text, Video)
  const handleCheckIn = useCallback((type) => {
    if (!friend) return;

    const today = new Date().toISOString().split('T')[0];
    const label = type.charAt(0).toUpperCase() + type.slice(1);

    const newEntry = {
      id: `entry-${++entryIdCounter.current}`,     // Clean unique ID using useRef
      type,
      title: `${label} with ${friend.name}`,
      date: today,
    };

    setTimeline((prev) => [newEntry, ...prev]);

    toast.success(`${label} with ${friend.name} logged!`, {
      style: { borderRadius: '12px' },
    });
  }, [friend]);

  const statusClass = {
    overdue: 'status-overdue',
    'almost due': 'status-almost-due',
    'on-track': 'status-on-track',
  };

  const statusLabel = {
    overdue: 'Overdue',
    'almost due': 'Almost Due',
    'on-track': 'On Track',
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="w-10 h-10 border-4 border-green-200 border-t-[#1e4d3b] rounded-full animate-spin" />
      </div>
    );
  }

  if (!friend) {
    return (
      <div className="text-center py-20 text-gray-500">
        Friend not found.{' '}
        <button
          onClick={() => navigate('/')}
          className="text-[#1e4d3b] underline hover:text-[#2a6b52]"
        >
          Go home
        </button>
      </div>
    );
  }

  const formattedDate = new Date(friend.next_due_date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Toaster position="bottom-right" />

      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 text-sm font-medium"
      >
        <i className="fa-solid fa-arrow-left text-xs"></i>
        Back to Friends
      </button>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* LEFT: Profile Info */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex flex-col items-center text-center mb-5">
              <img
                src={friend.picture}
                alt={friend.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-green-100 mb-3"
              />
              <h1 className="text-2xl font-bold text-gray-900">{friend.name}</h1>
              <span
                className={`mt-2 text-xs font-semibold px-3 py-1 rounded-full ${statusClass[friend.status]}`}
              >
                {statusLabel[friend.status]}
              </span>
            </div>

            {/* Email */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <i className="fa-regular fa-envelope text-gray-400"></i>
              <span>{friend.email}</span>
            </div>

            {/* Tags */}
            <div className="flex items-start gap-2 mb-4">
              <i className="fa-solid fa-tag text-gray-400 mt-0.5 text-sm"></i>
              <div className="flex flex-wrap gap-1">
                {friend.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bio */}
            <p className="bg-gray-50 rounded-xl p-3 text-sm text-gray-600 leading-relaxed mb-5">
              {friend.bio}
            </p>

            {/* Action Buttons */}
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

        {/* RIGHT: Stats & Actions */}
        <div className="lg:col-span-3 space-y-4">
          {/* Stat Cards */}
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
                className="text-xs text-[#1e4d3b] font-medium flex items-center gap-1 hover:underline"
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
                  onClick={() => {
                    setGoal(tempGoal);
                    setEditingGoal(false);
                    toast.success('Goal updated!');
                  }}
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
                { type: 'call', icon: 'fa-solid fa-phone', color: 'hover:bg-blue-50 text-blue-600' },
                { type: 'text', icon: 'fa-solid fa-message', color: 'hover:bg-yellow-50 text-yellow-600' },
                { type: 'video', icon: 'fa-solid fa-video', color: 'hover:bg-purple-50 text-purple-600' },
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

            {/* Recent Check-ins */}
            {timeline.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-xs text-gray-400 font-medium">Recent check-ins</p>
                {timeline.slice(0, 3).map((entry) => (
                  <div key={entry.id} className="flex items-center gap-2 text-xs text-gray-500">
                    <i
                      className={
                        entry.type === 'call'
                          ? 'fa-solid fa-phone text-blue-500'
                          : entry.type === 'text'
                          ? 'fa-solid fa-message text-yellow-500'
                          : 'fa-solid fa-video text-purple-500'
                      }
                    ></i>
                    <span>{entry.title}</span>
                    <span className="ml-auto text-gray-300">{entry.date}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendDetail;