import { useState, useEffect } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const [foodItems, setFoodItems] = useState([]);

  const fetchFoodItems = () => {
    fetch("/api/potluck")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Request not OK.");
        }
      })
      .then((foodItemsFromServer) => {
        setFoodItems(foodItemsFromServer);
      })
      .catch((error) => {
        console.error(error);
        alert("Something went wrong");
      });
  };

  useEffect(() => {
    fetchFoodItems();
  }, []);

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />
      {foodItems.map(item => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <h4>{item.username}</h4>
          <h5>{item.type}</h5>
        </div>
      ))}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
