import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react"
import { useContext, createContext, useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
const SidebarContext = createContext()
import { useSelector } from "react-redux"

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true)
  const [sidebarWidth, setSidebarWidth] = useState(60)
  const navigate = useNavigate()
  const userData = useSelector((state) => state.userReducer.user);

  const toHome =()=>{
    navigate('/home')
  }
  useEffect(() => {
    setSidebarWidth(expanded ? 60 : 20)
  }, [expanded])
 
  return (
    <aside className={`w-${sidebarWidth} h-screen`}>
      <nav className={`h-full flex flex-col bg-white border-r shadow-sm w-${sidebarWidth}`}>
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src='/images/logo-projestro.png'
            onClick={toHome}
            className={`overflow-hidden transition-all ${
              expanded ? "w-20" : "w-0"
            }`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <img
            src={userData.profilePicture}
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">{userData.username}</h4>
              <span className="text-xs text-gray-600">{userData.email}</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  )
}

export function SidebarItem({ icon, text, active, alert ,onClick}) {
  const { expanded } = useContext(SidebarContext)
  const handleItemClick = () => {
    if (onClick) {
      onClick(); // Call the provided onClick function if available
    }
  };
  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
    `}
    onClick={handleItemClick} 
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  )
}