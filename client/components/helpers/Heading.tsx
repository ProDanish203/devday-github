export const Heading = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <div>
      <h2 className="sm:text-4xl text-2xl text-text font-semibold mb-1">
        {title}
      </h2>
      <p className="text-para text-sm w-full">{desc}</p>
    </div>
  );
};
