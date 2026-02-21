export default function TodoList({ todos, onToggle, onDelete, onRestore, currentFilter }) {
  if (todos.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="text-zinc-300 dark:text-zinc-700 text-sm italic font-medium">Bu liste şu an boş...</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <div 
          key={todo.id}
          className={`group flex items-center justify-between p-5 rounded-2xl border transition-all ${
            todo.status === "completed" 
              ? "bg-zinc-50/50 dark:bg-zinc-900/30 opacity-60 border-transparent" 
              : "bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-md"
          }`}
        >
          <span className="text-sm font-semibold tracking-tight">{todo.text}</span>
          
          <div className="flex gap-1">
            {todo.status === "deleted" ? (
              <button 
                onClick={() => onRestore(todo.id)}
                className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-blue-500 hover:text-white rounded-lg text-[10px] font-bold transition-all"
              >
                GERİ YÜKLE
              </button>
            ) : (
              <>
                <button 
                  onClick={() => onToggle(todo.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    todo.status === "completed" ? "text-blue-500 bg-blue-50 dark:bg-blue-900/20" : "text-zinc-300 hover:text-green-500"
                  }`}
                >
                  {todo.status === "completed" ? "✅" : "⭕"}
                </button>
                <button 
                  onClick={() => onDelete(todo.id)}
                  className="p-2 text-zinc-300 hover:text-red-500 transition-colors"
                >
                  🗑️
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}