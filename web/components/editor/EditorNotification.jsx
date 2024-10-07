import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { resetNotificationState } from './modules/editor';

const StyledEditorNotification = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  // notification default invisible state
  opacity: 0;
  transform: translateY(-50px);
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  z-index: 100;
  font-family: 'NanumBarunGothic';
  padding: 0.3em 0;
  transition:
    transform 0.7s ease-in-out,
    opacity 0.7s;
  background-color: ${({ $notificationState }) =>
    $notificationState ? '#236931' : '#BA3A3A'};
  // when the warning is active show notification
  &.show {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export default function NotificationContainer() {
  // notification default invisible state
  const [disable, setDisable] = useState(false);

  const dispatch = useDispatch();

  const { notificationState, notificationMessage } = useSelector(
    ({ editor }) => editor,
  );

  useEffect(() => {
    // notificationState === null --> initial state
    // when notificationState true of false active notification(setDisable(true))
    if (notificationState !== null) {
      setDisable(true);
      // 2 seconds later auto close notification
      // if setDisable and resetNotificationState running together notification the background color changes while the notification disapper
      setTimeout(() => {
        setDisable(false);
      }, 2000);
      // 5 seconds later resetNotificationState
      setTimeout(() => {
        dispatch(resetNotificationState());
      }, 5000);
    }
  }, [notificationState]);

  return (
    <StyledEditorNotification
      className={disable && 'show'}
      $notificationState={notificationState}
    >
      <p>{notificationMessage}</p>
    </StyledEditorNotification>
  );
}
