export interface Current {
  id?: number;
  artid?: number;
  title?: string;
  category?: Categorty;
  tag?: Tag[];
  thumb_url?: string;
  cover_url?: string;
  time?: number;
  content: string;
  tour?: number;
  like?: number;
  comment?: number
}

export interface Categorty {
  categoryId: number;
  categoryName?: string;
}

export interface Tag {
  tagId: number;
  tagName?: string;
}
