export type Tag = {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  postCount: number;
  followerCount: number;
  color: string | null;
  icon: string | null;
  type: string | null;
  version: string | null;
  synonyms: string[];
  parentId: string | null;
};

export type TagProps = {
  tags: Tag[];
};