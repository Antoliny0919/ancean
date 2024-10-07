import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import * as postAPI from '../../api/post';

export default function usePost() {
  const accessToken = useSelector(({ auth }) => auth.user.token.access);

  const headers = {
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };

  const router = useRouter();

  const changePrivate = async (id) => {
    // make the post's is_finish value false,
    // leaving it inaccessible from the outside (ready status of post modification)
    const body = { is_finish: false };
    const response = await postAPI.patchPost({ id, body, headers });
    return response;
  };

  const editPost = async (id) => {
    // save the postId to localStorage and navigate to the writing page
    try {
      await changePrivate(id);
      localStorage.setItem('patchPostId', id);
      router.push('/posts/newpost');
    } catch (err) {
      let message = err.response.data.detail;
      alert(message);
    }
  };

  const deletePost = async ({ id, teardown = () => {} }) => {
    let confirmState = confirm('정말 삭제하시겠습니까?');
    if (confirmState) {
      try {
        const response = await postAPI.deletePost({ id, headers });
        if (response.status === 204) {
          // if request success follow up callback method
          teardown();
        }
      } catch (err) {
        let message = err.response.data.detail;
        alert(message);
      }
    }
  };

  return { changePrivate, editPost, deletePost };
}
