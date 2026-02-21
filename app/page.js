'use client';

import { useState, useEffect } from 'react';
import FilterButtons from "@/components/FilterButtons";
import TodoInput from "@/components/TodoInput";
import TodoList from "@/components/TodoList";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("Tümü");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("my-next-todos");
    if (saved) setTodos(JSON.parse(saved));
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("my-next-todos", JSON.stringify(todos));
    }
  }, [todos, isMounted]);

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text, status: "active" };
    setTodos([...todos, newTodo]);
  };

  const toggleStatus = (id) => {
    setTodos(todos.map(t => 
      t.id === id ? { ...t, status: t.status === "completed" ? "active" : "completed" } : t
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, status: "deleted" } : t));
  };

  const restoreTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, status: "active" } : t));
  };

  const filteredTodos = todos.filter(t => {
    if (filter === "Yapılacaklar") return t.status === "active";
    if (filter === "Tamamlananlar") return t.status === "completed";
    if (filter === "Silinenler") return t.status === "deleted";
    return t.status !== "deleted"; 
  });

  if (!isMounted) return null;

  return (
    <main className="flex min-h-screen items-start justify-center p-4 pt-10 md:pt-20 bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-950 p-8 rounded-[2.5rem] shadow-2xl border border-zinc-100 dark:border-zinc-900">
        
        <header className="text-center mb-8">
          <h1 className="text-3xl font-extrabold bg-linear-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            Görevlerim
          </h1>
          <p className="text-zinc-400 text-xs mt-2 uppercase tracking-widest font-semibold">
            {new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </header>

        <FilterButtons 
          currentFilter={filter} 
          setFilter={setFilter} 
          todos={todos} 
        />

        {(filter === "Tümü" || filter === "Yapılacaklar") && (
          <TodoInput onAdd={addTodo} />
        )}

        <div className="h-112.5 overflow-y-auto pr-2 custom-scrollbar">
          <TodoList 
            todos={filteredTodos} 
            onToggle={toggleStatus} 
            onDelete={deleteTodo} 
            onRestore={restoreTodo}
            currentFilter={filter}
          />
        </div>

        <footer className="mt-10 text-center">
          <p className="text-[10px] text-zinc-300 dark:text-zinc-700 font-medium">
            Next.js & Tailwind & React.js ile M. Enes Bayram Tarafından Hazırlandı.
          </p>
        </footer>
      </div>
    </main>
  );
}