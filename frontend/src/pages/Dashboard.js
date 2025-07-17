import React from 'react';
import Title from '../components/Title';

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <>
            <Title value="Dashboard" />
            <h1 className='border-bottom'>Dashboard</h1>
            <p>Bem-vindo(a), {user.nome}!</p>
        </>
    );
};

export default Dashboard;