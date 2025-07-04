export type Link = {
  label: string;
  url: string;
  icon: string;
};
export type CardData = {
  id: number;
  slug: string;
  avatarUrl: string;
  title: string;
  links: Link[];
};
