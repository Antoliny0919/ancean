import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FcCancel } from 'react-icons/fc';
import styled from 'styled-components';
import useModal from '../../hooks/useModal';
import BaseModal from '../modal/BaseModal';
import CommonButton from '../button/CommonButton';

const StyledAuthModal = styled.div`
  @media screen and (min-width: 768px) {
    font-size: 16px;
  }
  height: 100%;
  width: 20em;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  font-size: 14px;
  svg {
    width: 4em;
    height: 4em;
  }
`;

/**
 * param permit is value for specific permission in the user model
 */
export default function AuthModal({ permits }) {
  const { state, open } = useModal();

  const router = useRouter();

  const { user } = useSelector(({ auth }) => auth);

  useEffect(() => {
    permits.forEach((permit) => {
      if (user.auth === false || user.info[permit] === false) {
        open();
        return;
      }
    });
  }, [user]);

  return (
    <BaseModal state={state}>
      <StyledAuthModal>
        <FcCancel />
        <p>로그인이 필요한 서비스입니다!</p>
        <CommonButton
          props={{
            onClick: () => {
              router.push('/member/signin');
            },
          }}
        >
          로그인 하러 가기
        </CommonButton>
      </StyledAuthModal>
    </BaseModal>
  );
}
