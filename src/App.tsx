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
  const habitListRef = useRef<HTMLDivElement>(null);

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
          case 'ArrowLeft':
          case 'ArrowRight':
            navigateFocus(e.key);
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
    const elements = ['form-name', 'form-color', 'form-submit', ...habits.map(h => `habit-${h.id}`)];
    const currentIndex = elements.indexOf(focusedElement);
    let newIndex;

    if (direction === 'ArrowDown' || direction === 'ArrowRight') {
      newIndex = (currentIndex + 1) % elements.length;
    } else if (direction === 'ArrowUp' || direction === 'ArrowLeft') {
      newIndex = (currentIndex - 1 + elements.length) % elements.length;
    } else {
      return;
    }

    setFocusedElement(elements[newIndex]);

    // Scroll into view if necessary
    const newElement = document.getElementById(elements[newIndex]);
    if (newElement && habitListRef.current) {
      const listRect = habitListRef.current.getBoundingClientRect();
      const elementRect = newElement.getBoundingClientRect();

      if (elementRect.bottom > listRect.bottom) {
        habitListRef.current.scrollTop += elementRect.bottom - listRect.bottom;
      } else if (elementRect.top < listRect.top) {
        habitListRef.current.scrollTop -= listRect.top - elementRect.top;
      }
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
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 text-white p-8">
      <h1 className="text-5xl font-bold mb-8 text-center">Habit Tracker</h1>
      <div className="max-w-7xl mx-auto">
        <HabitForm
          onSubmit={addHabit}
          focusedElement={focusedElement}
          setFocusedElement={setFocusedElement}
        />
        <div className="grid grid-cols-1 gap-8 mt-8">
          <Calendar habits={habits} habitLogs={habitLogs} onToggle={toggleHabitCompletion} />
          <HabitList
            habits={habits}
            habitLogs={habitLogs}
            onToggle={toggleHabitCompletion}
            onEdit={setEditingHabit}
            onDelete={deleteHabit}
            focusedElement={focusedElement}
            setFocusedElement={setFocusedElement}
            habitListRef={habitListRef}
          />
        </div>
      </div>
    </div>
  );
}

export default App;