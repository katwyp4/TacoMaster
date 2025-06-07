import React, { useEffect, useState } from 'react';
import './ProfilePage.css';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

   useEffect(() => {
        fetch('http://localhost:8080/api/users/me', { credentials: 'include' })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    navigate('/login'); 
                    throw new Error('Brak autoryzacji');
                }
                return res.json();
            })
            .then(data => setUser(data))
            .catch(error => {
                console.error("Błąd podczas ładowania profilu:", error);
                setUser(null);
            })
            .finally(() => setLoading(false));
    }, [navigate]);

   useEffect(() => {
  if (user?.email) {
    fetch('http://localhost:8080/api/orders', { credentials: 'include' })
      .then(res => res.json())
      .then(allOrders => {
        console.log("Zamówienia z backendu:", allOrders);
        setOrders(allOrders.filter(o => o.userEmail === user.email));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }
}, [user]);


    if (loading) return <p>Ładowanie profilu...</p>;
    if (!user) return <p>Błąd ładowania profilu użytkownika</p>;

    return (
        <div className="profile-container">
            <h2>Profil użytkownika</h2>
            <div className="user-info">
                <p><strong>Nazwa użytkownika:</strong> {user.username || user.email}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Rola:</strong> {user.role}</p>
            </div>

            <div className="orders-section">
                <h3>Twoje zamówienia</h3>
                {orders.length === 0 ? (
                    <p>Brak zamówień</p>
                ) : (
                   <ul>
  {orders.map(order => {
    return (
      <li key={order.id} className="order-card">
        <p><strong>Zamówienie</strong></p>
        <p>Łączna cena: {order.totalPrice} zł</p>
        <p>Data: {order.createdAt}</p>
        <p>Miejsce odbioru: {order.pickupLocation}</p>
        <p>Metoda płatności: {order.paymentMethod}</p>
        <div className="order-items">
        <h4>Szczegóły zamówienia:</h4>
        <ul>
            {order.items?.map((item, idx) => (
            <li key={item.id || idx} style={{ marginBottom: "1rem" }}>
                <p><strong>Tortilla #{idx + 1}:</strong></p>
                <p><strong>Tortilla:</strong> {item.tortilla}</p>
                <p><strong>Mięso:</strong> {item.meat}</p>
                <p><strong>Dodatki:</strong> {item.addons?.join(", ") || "Brak"}</p>
                <p><strong>Sosy:</strong> {item.sauces?.join(", ") || "Brak"}</p>
            </li>
            ))}
        </ul>
        </div>

      </li>
    );
  })}
</ul>

                )}
            </div>
        </div>
    );
};

export default ProfilePage;
