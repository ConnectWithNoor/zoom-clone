import { getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../store/hooks';
import { userCollectionRef } from '../utils/firebaseConfig';
import { UserType } from '../utils/types';

function useFetchUsers() {
  const [users, setUsers] = useState<UserType[]>([]);
  const uid = useAppSelector((state) => state.auth.userInfo?.uid);

  useEffect(() => {
    const getUsers = async () => {
      if (uid) {
        const getUsersQuery = query(userCollectionRef, where('uid', '!=', uid));
        const fetchedUsers = await getDocs(getUsersQuery);

        const firebaseUsers: UserType[] = [];

        fetchedUsers.forEach((user) => {
          const userdata = user.data() as UserType;
          firebaseUsers.push({ ...userdata, label: userdata.name });
        });
        setUsers(firebaseUsers);
      }
    };

    getUsers();
  }, [uid]);

  return users;
}

export default useFetchUsers;
