import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setToasts } from '../store/slices/MeetingSlice';
import { ToastType } from '../utils/types';

type Props = Omit<ToastType, 'id'>;

function useToast() {
  const toasts = useAppSelector((state) => state.meetings.toasts);
  const dispatch = useAppDispatch();

  const createToast = ({ title, color }: Props) => {
    dispatch(
      setToasts(toasts.concat({ id: new Date().toISOString(), title, color }))
    );
  };
  return [createToast];
}

export default useToast;
