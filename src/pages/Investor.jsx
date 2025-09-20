import React from 'react';
import { Outlet } from 'react-router-dom';
import InvestorForm from '../components/investor/InvestorForm';

const Investor = () => {
    return (
        <div>
            {/* Show InvestorForm by default */}
            <Outlet context={{ showForm: true }} />
        </div>
    );
};

export default Investor;