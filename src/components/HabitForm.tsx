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
    <form onSubmit={handleSubmit} className="mb-4">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Add New Habit</h2>
      <div className="flex items-center mb-2">
        <input
          type="text"
          id="form-name"
          ref={nameInputRef}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`flex-grow px-2 py-1 text-gray-700 border rounded-l-lg focus:outline-none ${focusedElement === 'form-name' ? 'ring-2 ring-yellow-400' : 'focus:border-blue-500'}`}
          placeholder="Habit name"
          required
          onFocus={() => setFocusedElement('form-name')}
        />
        <input
          type="color"
          id="form-color"
          ref={colorInputRef}
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className={`w-10 h-8 border-t border-b cursor-pointer ${focusedElement === 'form-color' ? 'ring-2 ring-yellow-400' : ''}`}
          onFocus={() => setFocusedElement('form-color')}
        />
        <button
          type="submit"
          id="form-submit"
          ref={submitButtonRef}
          className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded-r-lg inline-flex items-center ${focusedElement === 'form-submit' ? 'ring-2 ring-yellow-400' : ''}`}
          onFocus={() => setFocusedElement('form-submit')}
        >
          <Check size={16} className="mr-1" /> Add
        </button>
      </div>
    </form>
  );
};

export default HabitForm;