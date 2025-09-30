import FavouriteButton from '../FavouriteButton';
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
  isClicked: () => void;
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
  isClicked,
}: SearchGridItemProps) {
  const MAX_LENGTH = 25;

  return (
    <ul className="col-span-4 col-start-1 flex flex-col gap-6 sm:col-span-12 md:gap-10">
      <li className="inline-block p-4">
        <a
          href={objectURL}
          target="blank"
          className="relative inline-block w-10/12 text-lg uppercase no-underline underline-animate">
          <div className="hover:text-red-400">
            <div className="mb-1">
              <span>
                <h3 className="text-2xl italic">{title}</h3>
              </span>
            </div>
            <div className="grid grid-cols-4 gap-8">
              <div className="flex flex-row gap-8">
                {artist && artist.length <= MAX_LENGTH && (
                  <div>
                    <div className="text-white font-medium text-sm ">
                      {artist}
                    </div>
                  </div>
                )}

                {date && (
                  <div>
                    <div className="text-white font-medium grid-cols-2 text-xs">
                      {date}
                    </div>
                  </div>
                )}

                {culture && culture.length <= MAX_LENGTH && (
                  <div>
                    <div className="text-xs text-white font-medium">
                      {culture}
                    </div>
                  </div>
                )}

                {period && period.length <= MAX_LENGTH && (
                  <div>
                    <div className="text-xs text-white font-medium">
                      {period}
                    </div>
                  </div>
                )}

                {medium && medium.length <= MAX_LENGTH && (
                  <div className="col-span-2">
                    <div className="text-xs text-white font-medium">
                      {medium}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </a>
        <FavouriteButton />
      </li>
    </ul>
  );
}
