import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { changeValue } from './modules/auth';
import { signin } from './modules/auth';

export default function useSignin() {
  const router = useRouter();

  const dispatch = useDispatch();

  const changeInputValue = (e) => {
    dispatch(
      changeValue({
        step: 'signin',
        name: e.target.name,
        value: e.target.value,
      }),
    );
  };

  const { email, password } = useSelector(({ auth }) => auth.signin);

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(signin({ email, password }));
    if (response.payload.refresh) {
      router.push('/');
    }
  };

  return { changeInputValue, onSubmit };
}
