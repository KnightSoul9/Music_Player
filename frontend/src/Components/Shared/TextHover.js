import { Link } from "react-router-dom"
function TextHover({displayText,active,targetLink}) {
  return (
    <Link to = {targetLink} className="block">
    <div className="flex items-centre justify-start cursor-pointer">
         <div className={`${active?"text-white":"text-gray-500"} text-lg font-semibold py-3 hover:text-white`}>{displayText}</div>
    </div>
    </Link>
  )
}

export default TextHover