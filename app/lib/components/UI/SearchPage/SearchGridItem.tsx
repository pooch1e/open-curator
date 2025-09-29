import './underline-animate.css';
interface SearchGridItemProps {
  title: string;
  artist: string;
  date: string;
  medium: string;
  objectURL: string;
  period: string;
  description: string;
  culture: string;
}
export default function SearchGridItem({
  title,
  artist,
  date,
  medium,
  objectURL,
  period,
  description,
  culture,
}: SearchGridItemProps) {
  return (
    <ul className="col-span-4 col-start-1 flex flex-col gap-6 sm:col-span-12 md:gap-10">
      <li className="inline-block p-2">
        <a
          href={objectURL}
          target="blank"
          className="relative inline-block text-lg uppercase no-underline underline-animate">
          <div className='hover:text-red-400'>
            <div className="mb-1">
              <span>
                <h3 className="text-2xl italic">{title}</h3>
              </span>
            </div>
            <div className="grid grid-rows-2 gap-2 text-sm p-2">
              {artist && (
                <div>
                  <div className="text-xs text-white uppercase tracking-wide">
                    Artist
                  </div>
                  <div className="text-white font-medium">{artist}</div>
                </div>
              )}

              {date && (
                <div>
                  <div className="text-xs text-white uppercase tracking-wide">
                    Date
                  </div>
                  <div className="text-white font-medium">{date}</div>
                </div>
              )}

              {culture && (
                <div>
                  <div className="text-xs text-white uppercase tracking-wide">
                    Culture
                  </div>
                  <div className="text-white font-medium">{culture}</div>
                </div>
              )}

              {period && (
                <div>
                  <div className="text-xs text-white uppercase tracking-wide">
                    Period
                  </div>
                  <div className="text-white font-medium">{period}</div>
                </div>
              )}

              {medium && (
                <div className="col-span-2">
                  <div className="text-xs text-white uppercase tracking-wide">
                    Medium
                  </div>
                  <div className="text-white font-medium">{medium}</div>
                </div>
              )}

              {/* {description && (
              <div className="col-span-2 pt-3 border-t border-gray-200">
                <div className="text-xs text-white uppercase tracking-wide mb-1">
                  Description
                </div>
                <p className="text-white leading-relaxed">{description}</p>
              </div>
            )} */}
            </div>
          </div>
        </a>
      </li>
    </ul>
  );
}
