import { useEffect, useState } from "react";
import axios from "axios";

export default function useRestaurant() {
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if(!stored) return;
    const user = JSON.parse(stored);
    if (!user?.id) return;

    axios
      .get(`http://localhost:3000/restaurants/user/${user.id}`)
      .then((res) => {
        setRestaurant(res.data);
        localStorage.setItem("restaurant", JSON.stringify(res.data));
      })
      .catch(console.error);
  }, []);

  return restaurant;
}