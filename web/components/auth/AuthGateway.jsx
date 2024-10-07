import { Cookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { reIssueAccessToken } from './modules/auth';
import { getUserData } from './modules/auth';

/**
 * use it as the top parent component for pages that require authentication permission
 * the ability to initialize tokens required for authentication is provided
 */
export default function AuthGateway({ children }) {
  const dispatch = useDispatch();

  const cookies = new Cookies();

  const accessToken = useSelector(({ auth }) => auth.user.token.access);
  const refreshToken = cookies.get('refresh');
  useEffect(() => {
    // the presence of a refresh token can generate access token
    // reissue tokens and save them in the auth store
    dispatch(reIssueAccessToken({ refresh: refreshToken }));
  }, []);

  useEffect(() => {
    const headers = { Authorization: `Bearer ${accessToken}` };
    accessToken && dispatch(getUserData({ headers }));
  }, [accessToken]);

  return <>{children}</>;
}
