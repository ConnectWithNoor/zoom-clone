import { NavigateFunction } from 'react-router-dom';
import { BreadCrumbsType } from './types';

export const getCreateMeetingsBreadCrumbs = (
  navigate: NavigateFunction
): BreadCrumbsType[] => {
  return [
    {
      text: 'Dashboard',
      href: '#',
      onClick: () => navigate('/'),
    },
    {
      text: 'Create Meeting',
    },
  ];
};
