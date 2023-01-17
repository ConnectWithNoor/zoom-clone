export type BreadCrumbsType = {
  text: string;
  href?: string;
  onClick?: () => void;
};

export type UserType = {
  email: string;
  name: string;
  uid: string;
  label?: string;
};
