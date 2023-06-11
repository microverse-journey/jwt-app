import { useEffect } from "react";

function Home() {
  const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    location.href = "/login"
  }

  useEffect(() => {
    if(!localStorage.getItem("user")) {
      location.href = "/login"
    }
  }, [])
  return (
    <div className="container">
      <div className="home-container">
        <h2>Welcome to the Home Page!</h2>
        <p>This is the content of the home page.</p>
        <button onClick={logout} className="logout-btn">Logout</button>
      </div>
    </div>
  )
}

export default Home
