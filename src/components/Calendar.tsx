import React from 'react';
import { Habit, HabitLog } from '../types';

interface CalendarProps {
  habits: Habit[];
  habitLogs: HabitLog[];
  onToggle: (habitId: string, date: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ habits, habitLogs, onToggle }) => {
  const weeks = 4; // Show 4 weeks of data
  const days = Array.from({ length: 7 * weeks }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d;
  }).reverse();

  const months = Array.from(new Set(days.map(d => d.toLocaleString('default', { month: 'short' }))));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Activity Calendar</h2>
      <div className="flex mb-4">
        {months.map((month, index) => (
          <div key={month} className="flex-1 text-center text-xl font-semibold text-gray-600">
            {month}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-semibold text-gray-600">{day}</div>
        ))}
        {days.map((date) => (
          <div key={date.toISOString()} className="relative aspect-square">
            <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-gray-400">
              {date.getDate()}
            </div>
            <div className="absolute inset-1 grid grid-cols-2 gap-1">
              {habits.map((habit) => {
                const isCompleted = habitLogs.some(
                  (log) => log.habitId === habit.id && log.date === date.toISOString().split('T')[0]
                );
                return (
                  <div
                    key={`${date.toISOString()}-${habit.id}`}
                    className={`rounded-sm cursor-pointer ${
                      isCompleted ? 'opacity-100' : 'opacity-20'
                    }`}
                    style={{ backgroundColor: habit.color }}
                    onClick={() => onToggle(habit.id, date.toISOString().split('T')[0])}
                    title={`${habit.name} - ${date.toLocaleDateString()}`}
                  ></div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap justify-start">
        {habits.map((habit) => (
          <div key={habit.id} className="flex items-center mr-6 mb-3">
            <div
              className="w-6 h-6 rounded-sm mr-2"
              style={{ backgroundColor: habit.color }}
            ></div>
            <span className="text-lg text-gray-600">{habit.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;