type GuitarTypes = ['acoustic', 'electric', 'ukulele'];

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

export type GuitarDataType = {
  type: string;
  label: string;
  stringsCount: string[];
};
