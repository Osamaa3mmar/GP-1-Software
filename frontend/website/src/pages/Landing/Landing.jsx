import { Link } from "react-router-dom"

export default function Landing() {
  return (
    <div>
      Landing Page <Link to={"/auth/login"}>Login</Link>{" "}
    </div>
  )
}
