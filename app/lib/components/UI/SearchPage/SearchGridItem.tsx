import './underline-animate.css';
interface SearchGridItemProps {
  type: string;
  title: string;
}
export default function SearchGridItem({ type, title }: SearchGridItemProps) {
  return (
    <ul className="col-span-4 col-start-1 flex flex-col gap-6 sm:col-span-12 md:gap-10">
      <li className="inline-block p-2">
        <a
          href="#"
          className="relative inline-block text-lg uppercase no-underline underline-animate">
          <div className="mb-1">
            <span>
              <h3>{title}</h3>
            </span>
          </div>
          <span>{type}</span>
        </a>
      </li>
    </ul>
  );
}
