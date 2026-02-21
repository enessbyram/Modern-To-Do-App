import { useState, useEffect } from 'react';

export default function TodoInput({ onAdd, editingTodo, onCancelEdit }) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (editingTodo) {
      setText(editingTodo.text);
    } else {
      setText("");
    }
  }, [editingTodo]);

  const handleAdd = () => {
    if (text.trim()) {
      onAdd(text);
      setText("");
    }
  };

  return (
    <div className="relative flex flex-col gap-2 mb-8">
      <div className="relative flex items-center">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          className={`w-full pl-5 pr-24 py-4 rounded-2xl border-2 bg-zinc-50/50 dark:bg-zinc-900/50 focus:outline-none transition-all text-sm font-medium ${
            editingTodo 
              ? "border-amber-500 focus:border-amber-600 shadow-lg shadow-amber-500/10" 
              : "border-zinc-100 dark:border-zinc-900 focus:border-blue-500 dark:focus:border-blue-500"
          }`}
          placeholder={editingTodo ? "Görevi düzenle..." : "Yeni görevini buraya yaz..."}
        />
        <button 
          onClick={handleAdd}
          className={`absolute right-2 px-4 py-2 text-white text-xs font-bold rounded-xl transition-all ${
            editingTodo ? "bg-amber-500 hover:bg-amber-600" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {editingTodo ? "GÜNCELLE" : "EKLE"}
        </button>
      </div>
      {editingTodo && (
        <button 
          onClick={onCancelEdit}
          className="text-[10px] text-zinc-400 hover:text-zinc-600 self-end font-bold tracking-tighter"
        >
          VAZGEÇ
        </button>
      )}
    </div>
  );
}