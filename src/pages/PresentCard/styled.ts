import styled from 'styled-components';

export const BackgroundPresentCard = styled.div<{ image: string }>`
    position: absolute;
    inset: 0px;
    background: url(${props => props.image}) center center / cover no-repeat;

    &:before {
        content: '';
        position: absolute;
        inset: 0px;
        background: linear-gradient(78deg, rgba(9, 9, 10, 0.4) 0px, rgba(9, 9, 10, 0.4) 44%, rgba(9, 9, 10, 0) 60%, rgba(9, 9, 10, 0));
    }
`;