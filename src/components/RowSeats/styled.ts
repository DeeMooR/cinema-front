import styled from 'styled-components';

export const SeatImage = styled.div<{image: string, type: string, isEmpty: boolean, cursor: string}>`
    width: ${props => props.type === 'single'
      ? `calc(40 / 660 * 100%)`
      : `calc(40 * 1.8 / 660 * 100%)`
    };
    padding-bottom: calc(40 / 660 * 100%);
    background: url(${props => props.image}) center center / 100% 100% no-repeat;
    opacity: ${props => (props.isEmpty ? 0.4 : 1)};
    cursor: ${props => props.cursor};
`;