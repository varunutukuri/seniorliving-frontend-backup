import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BookingFlow = () => {
    const locationState = useLocation().state || {};
    const { provider, service } = locationState;
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    if (!provider) {
        return <div className="container text-center py-20">No provider selected</div>;
    }

    const handleConfirm = () => {
        setStep(2);
        // In a real app, we would send data to backend here
    };

    return (
        <div className="booking-page animate-fade-in">
            <div className="container booking-container">
                <button onClick={() => navigate(-1)} className="back-btn-simple">← Back</button>

                <div className="booking-card-main">
                    {/* Header */}
                    <div className="booking-header">
                        <h1 className="booking-title">
                            {step === 1 ? 'Complete Your Booking' : 'Booking Confirmed!'}
                        </h1>
                    </div>

                    <div className="booking-body">
                        {step === 1 ? (
                            <>
                                {/* Booking Summary */}
                                <div className="booking-summary-box">
                                    <img src={provider.photo} alt={provider.name} className="summary-photo" />
                                    <div>
                                        <h3 className="summary-name">{provider.name}</h3>
                                        <p className="summary-role">{provider.role}</p>
                                        <p className="summary-price">{provider.price}</p>
                                    </div>
                                </div>

                                {/* Form */}
                                <div className="booking-form">
                                    <div className="form-group">
                                        <label className="form-label">Select Date</label>
                                        <input
                                            type="date"
                                            className="form-input"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Select Time</label>
                                        <select
                                            className="form-input"
                                            value={time}
                                            onChange={(e) => setTime(e.target.value)}
                                        >
                                            <option value="">Choose a slot...</option>
                                            <option value="09:00 AM">09:00 AM</option>
                                            <option value="11:00 AM">11:00 AM</option>
                                            <option value="02:00 PM">02:00 PM</option>
                                            <option value="05:00 PM">05:00 PM</option>
                                        </select>
                                    </div>

                                    <div className="form-actions">
                                        <button
                                            onClick={handleConfirm}
                                            disabled={!date || !time}
                                            className={`btn-primary full-width ${!date || !time ? 'btn-disabled' : ''}`}
                                        >
                                            Confirm Booking
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="success-view">
                                <div className="success-icon-circle">
                                    <span className="success-check">✓</span>
                                </div>
                                <h2 className="success-title">Thank You!</h2>
                                <p className="success-message">
                                    Your appointment with <span className="highlight-text">{provider.name}</span> has been confirmed for <br />
                                    <span className="highlight-date">{date} at {time}</span>.
                                </p>
                                <button
                                    onClick={() => navigate('/')}
                                    className="btn-primary"
                                >
                                    Return to Home
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingFlow;
