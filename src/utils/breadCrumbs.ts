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

export const getOneOnOneMeetingBreadCrumbs = (
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
      href: '#',
      onClick: () => navigate('/create-meeting'),
    },
    {
      text: 'Create One On One Meeting',
    },
  ];
};

export const getVideoConferenceBreadCrumbs = (
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
      href: '#',
      onClick: () => navigate('/create-meeting'),
    },
    {
      text: 'Create Video Conference',
    },
  ];
};

export const getMyMeetingsBreadCrumbs = (
  navigate: NavigateFunction
): BreadCrumbsType[] => {
  return [
    {
      text: 'Dashboard',
      href: '#',
      onClick: () => navigate('/'),
    },
    {
      text: 'My Meetings',
    },
  ];
};
