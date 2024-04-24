export const Heading = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <div>
      <h2 className="sm:text-4xl text-2xl text-text font-semibold mb-1">
        {title}
      </h2>
      <p className="text-text text-sm w-full max-w-4xl">{desc}</p>
    </div>
  );
};
