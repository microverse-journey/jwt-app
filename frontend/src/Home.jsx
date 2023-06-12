import { useState } from "react";
import { useEffect } from "react";

function Home() {
  const [users, setUsers] = useState([{name: "Dami"}])

  const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    location.href = "/login"
  }

  const fetchUsers = async () => {

    const token = JSON.parse(localStorage.getItem('token'));

    try {
      const res = await fetch("http://localhost:3000/api/v1/users", {
        headers: {
          Authorization: `${token}`
        }
      })

      const data = await res.json()
      
      if(res.ok) {
        setUsers(data)
      }else{

      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    !!localStorage.getItem("token") ? fetchUsers() : location.href = "/login"
  }, [])

  return (
    <div className="container">
      <div className="home-container">
        <h2>Welcome to the Home Page!</h2>
        <p>This is the content of the home page.</p>
        <h3>All users</h3>
        <ul>
          {
            users.map(user => <li key={1}>{user.name}</li>)
          }
        </ul>
        <button onClick={logout} className="logout-btn">Logout</button>
      </div>
    </div>
  )
}

export default Home
