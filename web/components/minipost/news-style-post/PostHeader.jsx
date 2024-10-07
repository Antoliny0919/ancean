import Image from '../../common/Image';
import styled from 'styled-components';
import { WaveLogo, CommentLogo } from '../../common/Icon';
import { flex } from '../../../styles/variable';

const StyledPostHeaderArea = styled.div`
  display: flex;
  flex-direction: row;
  img {
    width: 90%;
    border-top-left-radius: 8px;
    height: 14em;
  }
`;

const StyledMinibarArea = styled.div`
  font-family: 'SUIT-Regular';
  ${flex('column', 'flex-end', 'center')};
  width: 10%;
  margin-bottom: 1em;
  .state {
    text-align: center;
    svg {
      width: 1em;
      height: 1em;
      color: ${({ theme }) => theme.colors.mainColor[8]};
    }
  }
  .state + .state {
    margin-top: 1em;
  }
`;

export default function PostHeader({ header_image, wave }) {
  return (
    <StyledPostHeaderArea>
      <Image src={header_image}></Image>
      <StyledMinibarArea>
        <div className="state">
          {WaveLogo}
          <div>{wave}</div>
        </div>
        <div className="state">
          {CommentLogo}
          <div>0</div>
        </div>
      </StyledMinibarArea>
    </StyledPostHeaderArea>
  );
}
