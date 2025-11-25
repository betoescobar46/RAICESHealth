import React, { useState, useEffect } from 'react';

const DateTimeDisplay: React.FC = () => {
    const [dateTime, setDateTime] = useState({ date: '', time: '' });

    const formatChileanDate = (date: Date): string => {
        return date.toLocaleDateString('es-CL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const time = now.toLocaleTimeString('es-CL', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
                timeZone: 'America/Santiago'
            });
            setDateTime({ date: formatChileanDate(now), time });
        };

        updateDateTime();
        const timer = setInterval(updateDateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="text-white text-sm font-semibold">
            <div>{dateTime.date}</div>
            <div className="font-mono text-base">{dateTime.time}</div>
        </div>
    );
};

export default DateTimeDisplay;
