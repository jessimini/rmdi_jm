export default function CategoryCard({
  category,
  setSelectedCategory,
  selectedCategory,
}) {
  return (
    <div
      onClick={() => {
        setSelectedCategory(category.field);
      }}
      className="flex flex-col w-full cursor-pointer font-pretend"
    >
      <div
        className={`flex flex-col items-center space-y-3 pb-3  ${
          selectedCategory === category.field
            ? 'text-[#14171A]'
            : 'text-[#8A9FB1]'
        }`}
      >
        <span className="text-[4vw] md:text-xl xl:text-2xl">
          {category.field}
        </span>
        <span className="text-[3vw] md:text-lg xl:text-xl">
          {category.name}
        </span>
      </div>
      <hr
        className={`border-0 h-[1px]  ${
          selectedCategory === category.field ? 'bg-[#14171A]' : 'bg-[#C8D3DA]'
        }`}
      />
    </div>
  );
}
