import { useContext } from 'react';

import { authContext } from '../providers/auth';

export const useAuth = () => {
  return useContext(authContext);
};