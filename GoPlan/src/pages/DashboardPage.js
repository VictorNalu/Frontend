import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardPage = ({ userId }) => {
    const [travelPlans, setTravelPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTravelPlans = async () => {
            try {
                const response = await axios.get(`/api/dashboard?user_id=${userId}`);
                setTravelPlans(response.data);
            } catch (err) {
                setError('Error fetching travel plans.');
            } finally {
                setLoading(false);
            }
        };

        fetchTravelPlans();
    }, [userId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Your Travel Plans</h1>
            {travelPlans.length > 0 ? (
                <ul>
                    {travelPlans.map(plan => (
                        <li key={plan.id}>
                            <h2>{plan.name}</h2>
                            <p>{plan.description}</p>
                            <p>Date: {plan.date}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No travel plans found.</p>
            )}
        </div>
    );
};

export default DashboardPage;
