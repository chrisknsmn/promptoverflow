export type PostType = {
  id: string;
  title: string;
  content: string;
  author: {
    name?: string | null;
    username?: string | null;
    avatarUrl?: string | null;
  };
  voteCount: number;
  _count: {
    comments: number;
  };
  viewCount: number;
  tags: {
    tag: {
      name: string;
      color: string | null;
    };
  }[];
};

export type PostsProps = {
  params: PostType[];
};