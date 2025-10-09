import { ReactNode } from 'react';

interface PresetSelectorProps {
  children: ReactNode;
}

export default function PresetSelector({ children }: PresetSelectorProps) {
  return <div>{children}</div>;
}
