import { useEffect, useState } from 'react';

interface ChicagoPreset {
  id: string;
  label: string;
  sortField: string;
  description: string | null;
  searchTerm: string;
  category: 'sort' | 'content' | 'department' | 'medium';
}

export default function DropDown({ presets }: { presets: ChicagoPreset[] }) {
  const [open, setOpen] = useState<boolean>(false);
  console.log(presets, 'in dropdown menu');

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="dropdown text-2xl">
      <button className="hover:text-red-300" onClick={handleOpen}>
        Search Presets
      </button>
      {open ? (
        <ul className="menu">
          {presets.map((item) => (
            <li key={item.id} className="menu-item hover:text-red-500">
              <button>{item.label}</button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
