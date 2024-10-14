import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Habit, HabitLog } from '../types';

interface HabitListProps {
  habits: Habit[];
  habitLogs: HabitLog[];
  onToggle: (habitId: string, date: string) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (id: string) => void;
  focusedElement: string;
  setFocusedElement: (id: string) => void;
}

const HabitList: React.FC<HabitListProps> = ({ habits, habitLogs, onToggle, onEdit, onDelete, focusedElement, setFocusedElement }) => {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Your Habits</h2>
      <div className="space-y-2">
        {habits.map((habit) => {
          const completedToday = habitLogs.some(log => log.habitId === habit.id && log.date === today);
          const isFocused = focusedElement === `habit-${habit.id}`;
          return (
            <div
              key={habit.id}
              id={`habit-${habit.id}`}
              className={`flex items-center justify-between p-2 bg-gray-100 rounded-lg ${isFocused ? 'ring-2 ring-yellow-400' : ''}`}
              tabIndex={0}
              onFocus={() => setFocusedElement(`habit-${habit.id}`)}
            >
              <div className="flex items-center">
                <div
                  className="w-4 h-4 rounded-full mr-2"
                  style={{ backgroundColor: habit.color }}
                ></div>
                <h3 className="text-sm font-semibold text-gray-800">{habit.name}</h3>
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => onToggle(habit.id, today)}
                  className={`p-1 rounded-full ${
                    completedToday ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {completedToday ? '✓' : '○'}
                </button>
                <button
                  onClick={() => onEdit(habit)}
                  className="p-1 rounded-full bg-blue-500 text-white"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => onDelete(habit.id)}
                  className="p-1 rounded-full bg-red-500 text-white"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HabitList;