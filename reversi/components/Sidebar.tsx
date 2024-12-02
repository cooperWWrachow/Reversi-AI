import React from 'react'
import { MdFace } from "react-icons/md";


const Sidebar = () => {
  return (
    <div>
        {/* Sidebar Heading */}
        <div>
          <h1>Settings</h1>
        </div>
        {/* Content */}
        <div>
          <div className="form-control w-full">
            <label className="label cursor-pointer">
              <span className="label-text">You vs human</span>
              <input type="checkbox" className="toggle toggle-primary" defaultChecked />
              <span className="label-text">You vs. AI</span>
            </label>
          </div>
        </div>
    </div>
  )
}

export default Sidebar