
import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar() {
    return (
        <nav className="nav">
            <Link to="/" className="site-title">Sentiment Predictor</Link>
            <ul>
                  <CustomLink to="/home">Home</CustomLink>
                  <CustomLink to="/about">Report</CustomLink>
                  <CustomLink to="/models">Predict</CustomLink>
               
           </ul>
    </nav>
    )
}

function CustomLink({to, children, ...props}){
   const resolvedPath = useResolvedPath (to)
   const isActive = useMatch({ path: resolvedPath.pathname, end: true})
    return(
        <li className={isActive ? "active" : ""}>
            <Link to ={to} {...props}>
             {children}
            </Link>
        </li>
    )
}