export interface Image {
  alttext: string | null;
  baseimageurl: string;
  copyright: string | null;
  date: string | null;
  description: string | null;
  displayorder: number;
  format: string | null;
  height: number | null;
  idsid: number | null;
  iiifbaseuri: string | null;
  imageid: number;
  publiccaption: string | null;
  renditionnumber: string | null;
  technique: string | null;
  width: number | null;
}
export interface MuseumItem {
  id: number;
  title: string | null;
  artist: string | null;
  date: string | null;
  culture: string | null;
  medium: string | null;
  department: string | null;
  primaryimageurl: string | null;
  additionalImages: string[];
  isPublicDomain: boolean | null;
  objectURL: string | null;
  dimensions: string | null;
  images: Image[];
}

export interface SearchClientProps {
  data: MuseumItem[];
  onApiSearch?: (query: string) => Promise<MuseumItem[]>;
}

export interface SearchGridItemProps {
  id: number;
  title: string;
  artist: string;
  date: string;
  medium: string;
  objectURL: string | null;
  period: string;
  description: string;
  culture: string;
  images: Image;
  primaryImageUrl: string;
}