type GuitarTypes = ['acoustic', 'electric', 'ukulele'];

export const GuitarType = {
  Electric: 'electric',
  Acoustic: 'acoustic',
  Ukulele: 'ukulele',
};

export type CommentsGet = {
  id: string;
  userName: string;
  advantages: string;
  disadvantages: string;
  comment: string;
  rating: number;
  createAt: string;
  guitarId: number;
};

export type Guitar = {
  id: string;
  name: string;
  vendorCode: string;
  type: GuitarTypes;
  description: string;
  previewImg: string;
  stringCount: number;
  rating: number;
  price: number;
  comments?: CommentsGet[];
};
