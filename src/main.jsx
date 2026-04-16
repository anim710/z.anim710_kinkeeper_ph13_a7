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

  ],
  errorElement: <Notfound />
  },
  


  
  
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
       
        <RouterProvider router={router} />
  </StrictMode>,
)
