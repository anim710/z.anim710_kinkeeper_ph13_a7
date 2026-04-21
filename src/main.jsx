import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router/dom'
import { createBrowserRouter } from 'react-router';
import RootLayout from './Layout/RootLayout';
import Homepage from './pages/homepage/Homepage';
import Timeline from './pages/timeline/Timeline';
import Stats from './pages/stats/Stats';
import Notfound from './pages/notfound/Notfound';
import FriendDetail from './pages/frienddetail/FriendDetail' ;
import { TimelineProvider } from './context/TimelineContext'  // ← add this
import { Toaster } from 'react-hot-toast'




const router = createBrowserRouter([
  
  
    {
    path: "/",
    element: <RootLayout />,
      children: [
        {
    index: true,
    element: <Homepage />,
  },
  {
    path: "/timeline",
    element: <Timeline />,
  },
  {
    path: "/stats",
    element: <Stats />,
  },
  {
        path: "friend/:id",   // ← add this route
        element: <FriendDetail />,
  },

  ],
  errorElement: <Notfound />
  },
  


  
  
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
       
       <TimelineProvider>
      <Toaster position="bottom-right" />
      <RouterProvider router={router} />
    </TimelineProvider>
  </StrictMode>,
)
