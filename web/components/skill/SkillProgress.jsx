import styled from 'styled-components';
import ProgressBar from '../common/ProgressBar';
import ColorText from '../common/ColorText';
import { CATEGORY_DATA } from '../category/data';

const StyledSkillProgress = styled.li`
  width: 100%;
  font-size: inherit;
  padding: 0 1em;
  letter-spacing: 2px;
  margin-bottom: 20px;
  .label {
    display: flex;
    flex-direction: row;
    width: auto;
    margin-bottom: 0.3em;
    svg {
      width: 1.5em;
      height: 1.5em;
      margin-right: 10px;
      color: ${({ theme }) => theme.colors.white};
      border-radius: 5px;
    }
  }
`;

export default function SkillProgress({ skill }) {
  return (
    <StyledSkillProgress>
      <div className="label">
        <div className="logo">{CATEGORY_DATA[skill.name]['logo']}</div>
        <ColorText color={CATEGORY_DATA[skill.name]['color']}>
          {skill.name}
        </ColorText>
      </div>
      <ProgressBar
        percentage={skill.percentage}
        color={CATEGORY_DATA[skill.name]['color']}
      />
    </StyledSkillProgress>
  );
}
