import React, { useEffect, useState } from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);

    // MOCK
    useEffect(() => {
        const mockUser = {
            username: 'testUser',
            email: 'test@example.com',
        };

        const mockOrders = [
            { id: 1, items: ['Taco', 'Burrito'], status: 'W trakcie realizacji' },
            { id: 2, items: ['Quesadilla'], status: 'Dostarczone' },
        ];

        setUser(mockUser);
        setOrders(mockOrders);
    }, []);

    if (!user) return <p>Ładowanie profilu...</p>;

    return (
        <div className="profile-container">
            <h2>Profil użytkownika</h2>
            <div className="user-info">
                <p><strong>Nazwa użytkownika:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>

            <div className="orders-section">
                <h3>Twoje zamówienia</h3>
                {orders.length === 0 ? (
                    <p>Brak zamówień</p>
                ) : (
                    <ul>
                        {orders.map(order => (
                            <li key={order.id} className="order-card">
                                <p><strong>Zamówienie #{order.id}</strong></p>
                                <p>Produkty: {order.items.join(', ')}</p>
                                <p>Status: {order.status}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
