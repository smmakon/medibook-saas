export default function Tooltip({ text, children }) {
  return (
    <div className="relative group flex items-center justify-center">
      {children}

      <div
        className="
          absolute
          bottom-full
          mb-2
          hidden
          group-hover:block
          bg-black
          text-white
          text-xs
          px-2
          py-1
          rounded
          whitespace-nowrap
        "
      >
        {text}
      </div>
    </div>
  );
}