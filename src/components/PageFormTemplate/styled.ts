import styled from 'styled-components';

export const BackgroundImage = styled.div<{ image: string }>`
    position: absolute;
    inset: 0px;
    background: url(${props => props.image}) center center / cover no-repeat;
    background-color: rgba(0, 0, 0, 0.5);

    &:before {
        content: '';
        position: absolute;
        inset: 0px;
        background-color: rgba(0, 0, 0, 0.5);
    }
    &:after {
        content: '';
        position: absolute;
        inset: 0px;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.00) 23.56%);
    }
`;