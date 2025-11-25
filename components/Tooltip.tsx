import React from 'react';
import { getAppointmentDuration } from '../constants';
import type { TooltipData } from '../types';

const Tooltip: React.FC<TooltipData> = ({ day, schedule, position }) => {
    return (
        <div
            className="fixed bg-white border border-gray-300 shadow-lg rounded-md p-4 z-50 w-72 text-sm pointer-events-none"
            style={{ top: `${position.top}px`, left: `${position.left}px` }}
        >
            <div className="font-bold mb-2 pb-2 border-b border-gray-200">
                Agenda del día {day}
            </div>
            {schedule.length > 0 ? (
                <ul className="list-none p-0 m-0 space-y-1">
                    {schedule.map((item, index) => {
                        // FIX: Use the 'in' operator for a robust type guard. The 'type' property
                        // was not a unique discriminant because `Appointment.type` is a generic `string`,
                        // which caused TypeScript's type narrowing to fail. This ensures `item` is
                        // correctly typed as `AvailableSlot` inside this block.
                        if ('prestation' in item) {
                            return (
                                <li key={index}>
                                    <span className="text-[#4a90e2] italic">{item.prestation}</span>
                                </li>
                            );
                        }
                        // FIX: Because of the type guard and early return above, the compiler now correctly
                        // infers that `item` is of type `Appointment` here, allowing safe access
                        // to `time` and `patient` properties.
                        const duration = getAppointmentDuration(item.type);
                        return (
                            <li key={index} className="flex justify-between items-center gap-2">
                                <span className="font-semibold">{item.time}</span>
                                <span className="flex-grow truncate" title={item.patient}>{item.patient}</span>
                                {duration && <span className="bg-gray-200 py-0.5 px-2 rounded-full text-xs font-bold whitespace-nowrap">{duration}</span>}
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p>No hay citas agendadas.</p>
            )}
        </div>
    );
};

export default Tooltip;
