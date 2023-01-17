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

export type FieldErrorType = {
  show: boolean;
  message: string[];
};
export type ToastType = {
  id: string;
  title: string;
  color: 'success' | 'primary' | 'warning' | 'danger' | undefined;
};
