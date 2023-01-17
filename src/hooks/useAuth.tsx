import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { setUser } from '../store/slices/AuthSlice';
import { firebaseAuth } from '../utils/firebaseConfig';

function useAuth() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsub = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        dispatch(
          setUser({
            uid: currentUser.uid,
            email: currentUser.email!,
            name: currentUser.displayName!,
          })
        );
      } else {
        navigate('/login');
      }
    });

    return () => unsub();
  }, [navigate, dispatch]);
}

export default useAuth;
