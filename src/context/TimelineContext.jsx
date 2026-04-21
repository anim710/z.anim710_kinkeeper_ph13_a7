// This file creates a "shared memory" for the whole app
// Any page can read the timeline entries or add new ones

import { createContext, useContext, useState } from 'react'

// Create the context (like a global container)
const TimelineContext = createContext()

// This is the provider — wrap your app with this so all pages can access it
export const TimelineProvider = ({ children }) => {

  // Start with empty array — no entries until user logs one
  const [entries, setEntries] = useState([])

  // This function adds a new entry when Call/Text/Video is clicked
  const addEntry = (type, friendId, friendName) => {
    const today = new Date().toISOString().split('T')[0]
    const label = type.charAt(0).toUpperCase() + type.slice(1)

    const newEntry = {
      id: Date.now(),       // unique id using timestamp
      type,                 // 'call', 'text', or 'video'
      friendId,
      friendName,
      title: `${label} with ${friendName}`,
      date: today,
    }

    // Add new entry at the top of the list
    setEntries((prev) => [newEntry, ...prev])
  }

  return (
    <TimelineContext.Provider value={{ entries, addEntry }}>
      {children}
    </TimelineContext.Provider>
  )
}

// Custom hook — makes it easy to use the context in any component
export const useTimeline = () => {
  return useContext(TimelineContext)
}