import { useEffect, createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { server } from '@/api/client';
import { getRetrievePost } from '../../components/editor/modules/editor';
import AuthModal from '../../components/auth/AuthModal';
import EditorNotification from '../../components/editor/EditorNotification';
import ContinueWritingModal from '../../components/editor/ContinueWritingModal';
import AuthGateway from '../../components/auth/AuthGateway';
import Editor from '../../components/editor/Editor';

export const EditorContext = createContext();

export default function newpost({ categories }) {
  const dispatch = useDispatch();

  const contextProps = {
    categories: categories,
  };

  const accessToken = useSelector(({ auth }) => auth.user.token.access);

  useEffect(() => {
    const requestPatchPostId = localStorage.getItem('patchPostId');

    if (accessToken) {
      const headers = { Authorization: `Bearer ${accessToken}` };
      if (requestPatchPostId) {
        dispatch(getRetrievePost({ id: requestPatchPostId, headers }));
        localStorage.removeItem('patchPostId');
      }
    }
  }, [accessToken]);

  return (
    <AuthGateway>
      <EditorContext.Provider value={contextProps}>
        {/* Notification Save Message */}
        <EditorNotification />
        <AuthModal permits={['is_staff']} />
        <ContinueWritingModal />
        <Editor />
      </EditorContext.Provider>
    </AuthGateway>
  );
}

export const getStaticProps = async () => {
  const response = await server.get('/api/category/');
  const categories = response.data;

  return { props: { categories: categories } };
};
