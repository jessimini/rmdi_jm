export default function FieldsCard({ field, setSelectedField, selectedField }) {
  return (
    <div
      onClick={() => {
        setSelectedField(field.field);

      }}
      className={`w-full font-pretend font-normal cursor-pointer  ${
        selectedField === field.keyword ? 'text-[#14171A]' : 'text-[#8A9FB1]'
      }`}
    >
      <div className="flex justify-between items-center py-10 z-20">
        <span className="text-[3vw] md:text-2xl xl:text-3xl">
          {field.field}
        </span>
        <div className="flex flex-row items-center space-x-6">
          <span className="text-[3vw] md:text-base xl:text-xl">
            {field.doctor}
          </span>
        </div>
      </div>
      <hr
        className={`border-0 h-[1px] ${
          selectedField === field.keyword ? 'bg-[#14171A]' : 'bg-[#C8D3DA]'
        } `}
      />
    </div>
  );
}
