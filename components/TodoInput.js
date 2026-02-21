import { useState } from 'react';

export default function TodoInput({ onAdd }) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text.trim()) {
      onAdd(text);
      setText("");
    }
  };

  return (
    <div className="relative flex items-center mb-8">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        className="w-full pl-5 pr-16 py-4 rounded-2xl border-2 border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/50 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none transition-all text-sm font-medium"
        placeholder="Yeni görevini buraya yaz..."
      />
      <button 
        onClick={handleAdd}
        className="absolute right-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all"
      >
        Ekle
      </button>
    </div>
  );
}