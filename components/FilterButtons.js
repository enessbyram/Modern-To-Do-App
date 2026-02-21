export default function FilterButtons({ currentFilter, setFilter, todos }) {
  const categories = ["Tümü", "Yapılacaklar", "Tamamlananlar", "Silinenler"];

  const getCount = (cat) => {
    if (cat === "Tümü") return todos.filter(t => t.status !== "deleted").length;
    if (cat === "Yapılacaklar") return todos.filter(t => t.status === "active").length;
    if (cat === "Tamamlananlar") return todos.filter(t => t.status === "completed").length;
    if (cat === "Silinenler") return todos.filter(t => t.status === "deleted").length;
    return 0;
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setFilter(cat)}
          className={`px-4 py-2 text-[11px] min-w-36 font-bold rounded-xl transition-all flex items-center gap-2 border ${
            currentFilter === cat
              ? "bg-zinc-900 dark:bg-white text-white dark:text-black border-zinc-900 dark:border-white shadow-lg shadow-zinc-200 dark:shadow-none"
              : "bg-white dark:bg-zinc-900 text-zinc-500 border-zinc-100 dark:border-zinc-800 hover:border-zinc-300"
          }`}
        >
          {cat}
          <span className={`px-1.5 py-0.5 rounded-md text-[9px] ${
            currentFilter === cat ? "bg-zinc-700 dark:bg-zinc-200" : "bg-zinc-100 dark:bg-zinc-800"
          }`}>
            {getCount(cat)}
          </span>
        </button>
      ))}
    </div>
  );
}