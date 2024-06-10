import { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';

const categories = [
  {
    id: 0,
    field: '없음',
  },
  {
    id: 1,
    field: '있음',
  }
];

export default function CategoriesForm({ formData, setFormData }) {
  const [selectedCategory, setSelectedCategory] = useState(formData.category);

  useEffect(() => {
    setFormData({ ...formData, category: selectedCategory });
  }, [selectedCategory]);

  return (
    <div className="flex flex-col w-full font-suit">
      <div className="w-full">
        <span className="text-2xl text-[#657786]">02</span>
      </div>
      <div className="flex flex-col md:flex-row w-full justify-between">
        <div className="md:w-[40%] pt-10">
          <span className="text-[5vw] md:text-2xl xl:text-3xl font-semibold">
            이전에 RMDI 병원을 방문한 적이 있습니까?
          </span>
        </div>
        <div className="flex flex-row md:w-[60%] py-10 justify-center space-x-6 pb-60">
          {categories.map((category, idx) => {
            return (
              <CategoryCard
                key={idx}
                category={category}
                index={idx}
                setSelectedCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
