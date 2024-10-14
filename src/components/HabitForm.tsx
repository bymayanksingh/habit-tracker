import React, { useState, useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import { Habit } from '../types';

interface HabitFormProps {
  habit?: Habit;
  onSubmit: (habit: Omit<Habit, 'id'>) => void;
  focusedElement: string;
  setFocusedElement: (id: string) => void;
}

const HabitForm: React.FC<HabitFormProps> = ({ habit, onSubmit, focusedElement, setFocusedElement }) => {
  const [name, setName] = useState(habit?.name || '');
  const [color, setColor] = useState(habit?.color || '#3B82F6');
  const nameInputRef = useRef<HTMLInputElement>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (habit) {
      setName(habit.name);
      setColor(habit.color);
    }
  }, [habit]);

  useEffect(() => {
    if (focusedElement === 'form-name' && nameInputRef.current) {
      nameInputRef.current.focus();
    } else if (focusedElement === 'form-color' && colorInputRef.current) {
      colorInputRef.current.focus();
    } else if (focusedElement === 'form-submit' && submitButtonRef.current) {
      submitButtonRef.current.focus();
    }
  }, [focusedElement]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, color });
    setName('');
    setColor('#3B82F6');
    setFocusedElement('form-name');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-4">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Habit Name
        </label>
        <input
          type="text"
          id="form-name"
          ref={nameInputRef}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none ${focusedElement === 'form-name' ? 'ring-4 ring-yellow-400' : 'focus:border-blue-500'}`}
          required
          onFocus={() => setFocusedElement('form-name')}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="color" className="block text-gray-700 font-bold mb-2">
          Habit Color
        </label>
        <input
          type="color"
          id="form-color"
          ref={colorInputRef}
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className={`w-full h-10 border rounded-lg cursor-pointer ${focusedElement === 'form-color' ? 'ring-4 ring-yellow-400' : ''}`}
          onFocus={() => setFocusedElement('form-color')}
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          id="form-submit"
          ref={submitButtonRef}
          className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center ${focusedElement === 'form-submit' ? 'ring-4 ring-yellow-400' : ''}`}
          onFocus={() => setFocusedElement('form-submit')}
        >
          <Check size={20} className="mr-1" /> Add Habit
        </button>
      </div>
    </form>
  );
};

export default HabitForm;