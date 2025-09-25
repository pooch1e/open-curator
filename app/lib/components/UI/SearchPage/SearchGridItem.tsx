import './underline-animate.css';
interface SearchGridItemProps {
  title: string;
  artist: string;
  date: string;
  medium: string;
  objectURL: string;
}
export default function SearchGridItem({
  title,
  artist,
  date,
  medium,
  objectURL,
}: SearchGridItemProps) {
  return (
    <ul className="col-span-4 col-start-1 flex flex-col gap-6 sm:col-span-12 md:gap-10">
      <li className="inline-block p-2">
        <a
          href={objectURL}
          className="relative inline-block text-lg uppercase no-underline underline-animate">
          <div className="mb-1">
            <span>
              <h3 className="text-2xl italic">{title}</h3>
            </span>
          </div>
          <div>
            <span>{artist}</span>
            <span>{date}</span>
            <span>{medium}</span>
          </div>
        </a>
      </li>
    </ul>
  );
}
