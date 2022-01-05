type GuitarType = ['acoustic', 'electric', 'ukulele'];

export type Guitar = {
  id: string;
  name: string;
  vendorCode: string;
  type: GuitarType;
  description: string;
  previewImg: string;
  stringCount: number;
  rating: number;
  price: number;
};
