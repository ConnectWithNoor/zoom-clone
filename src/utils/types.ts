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

export type MeetingJoinType = 'anyone-can-join' | 'video-conference' | '1-on-1';

export type MeetingType = {
  docId?: string;
  createdBy: string;
  invitedUsers: Array<string>;
  maxUsers: number;
  meetingDate: string;
  meetingId: string;
  meetingName: string;
  meetingType: MeetingJoinType;
  status: boolean;
};
