import React, { useState, useEffect, useRef } from 'react';
import HabitForm from './components/HabitForm';
import HabitList from './components/HabitList';
import Calendar from './components/Calendar';
import { Habit, HabitLog } from './types';

function App() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [habitLogs, setHabitLogs] = useState<HabitLog[]>([]);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [focusedElement, setFocusedElement] = useState<string>('form-name');
  const appRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedHabits = localStorage.getItem('habits');
    const storedHabitLogs = localStorage.getItem('habitLogs');
    if (storedHabits) setHabits(JSON.parse(storedHabits));
    if (storedHabitLogs) setHabitLogs(JSON.parse(storedHabitLogs));
  }, []);

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
    localStorage.setItem('habitLogs', JSON.stringify(habitLogs));
  }, [habits, habitLogs]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter'].includes(e.key)) {
        e.preventDefault();
        switch (e.key) {
          case 'ArrowUp':
          case 'ArrowDown':
            navigateFocus(e.key);
            break;
          case 'ArrowLeft':
          case 'ArrowRight':
            // Handle left/right navigation within components if needed
            break;
          case 'Enter':
            activateFocusedElement();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedElement, habits]);

  const navigateFocus = (direction: string) => {
    const elements = [
      'form-name', 'form-color', 'form-submit',
      ...habits.map(h => `habit-${h.id}`),
      ...Array.from({ length: 28 }, (_, i) => `calendar-${i}`)
    ];
    const currentIndex = elements.indexOf(focusedElement);
    let newIndex;

    if (direction === 'ArrowDown') {
      newIndex = (currentIndex + 1) % elements.length;
    } else if (direction === 'ArrowUp') {
      newIndex = (currentIndex - 1 + elements.length) % elements.length;
    } else {
      return;
    }

    setFocusedElement(elements[newIndex]);

    // Scroll into view if necessary
    const newElement = document.getElementById(elements[newIndex]);
    if (newElement && appRef.current) {
      newElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const activateFocusedElement = () => {
    const element = document.getElementById(focusedElement);
    if (element) {
      element.click();
    }
  };

  const addHabit = (habit: Omit<Habit, 'id'>) => {
    const newHabit = { ...habit, id: Date.now().toString() };
    setHabits([...habits, newHabit]);
  };

  const updateHabit = (updatedHabit: Habit) => {
    setHabits(habits.map(h => h.id === updatedHabit.id ? updatedHabit : h));
    setEditingHabit(null);
  };

  const deleteHabit = (id: string) => {
    setHabits(habits.filter(h => h.id !== id));
    setHabitLogs(habitLogs.filter(log => log.habitId !== id));
  };

  const toggleHabitCompletion = (habitId: string, date: string) => {
    const existingLog = habitLogs.find(log => log.habitId === habitId && log.date === date);
    if (existingLog) {
      setHabitLogs(habitLogs.filter(log => log.habitId !== habitId || log.date !== date));
    } else {
      setHabitLogs([...habitLogs, { habitId, date }]);
    }
  };

  return (
    <div ref={appRef} className="bg-gradient-to-br from-purple-600 to-blue-500 text-white p-4 h-screen overflow-y-auto">
      <h1 className="text-4xl font-bold mb-4 text-center">Habit Tracker</h1>
      <div className="bg-white rounded-lg shadow-md p-4 text-black">
        <HabitForm
          onSubmit={addHabit}
          focusedElement={focusedElement}
          setFocusedElement={setFocusedElement}
        />
        <Calendar 
          habits={habits} 
          habitLogs={habitLogs} 
          onToggle={toggleHabitCompletion}
          focusedElement={focusedElement}
          setFocusedElement={setFocusedElement}
        />
        <HabitList
          habits={habits}
          habitLogs={habitLogs}
          onToggle={toggleHabitCompletion}
          onEdit={setEditingHabit}
          onDelete={deleteHabit}
          focusedElement={focusedElement}
          setFocusedElement={setFocusedElement}
        />
      </div>
    </div>
  );
}

export default App;