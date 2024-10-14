import React from 'react';
import { Habit, HabitLog } from '../types';

interface CalendarProps {
  habits: Habit[];
  habitLogs: HabitLog[];
  onToggle: (habitId: string, date: string) => void;
  focusedElement: string;
  setFocusedElement: (id: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ habits, habitLogs, onToggle, focusedElement, setFocusedElement }) => {
  const weeks = 4; // Show 4 weeks of data
  const days = Array.from({ length: 7 * weeks }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d;
  }).reverse();

  const months = Array.from(new Set(days.map(d => d.toLocaleString('default', { month: 'short' }))));

  return (
    <div className="mb-4">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Activity Calendar</h2>
      <div className="flex mb-2">
        {months.map((month, index) => (
          <div key={`month-${index}`} className="flex-1 text-center text-sm font-semibold text-gray-600">
            {month}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-semibold text-gray-600 text-xs">{day.charAt(0)}</div>
        ))}
        {days.map((date, index) => (
          <div 
            key={date.toISOString()} 
            id={`calendar-${index}`}
            className={`relative aspect-square border border-gray-200 ${focusedElement === `calendar-${index}` ? 'ring-2 ring-yellow-400' : ''}`}
            tabIndex={0}
            onFocus={() => setFocusedElement(`calendar-${index}`)}
          >
            <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-400">
              {date.getDate()}
            </div>
            <div className="absolute inset-0 grid grid-cols-2 gap-0.5 p-0.5">
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
      <div className="mt-2 flex flex-wrap justify-start">
        {habits.map((habit) => (
          <div key={habit.id} className="flex items-center mr-4 mb-1">
            <div
              className="w-3 h-3 rounded-sm mr-1"
              style={{ backgroundColor: habit.color }}
            ></div>
            <span className="text-xs text-gray-600">{habit.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;