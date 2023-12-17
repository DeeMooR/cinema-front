import styled from 'styled-components';

export const BackgroundImage = styled.div<{ image: string; page: string }>`
    position: absolute;
    inset: 0px;
    background: url(${props => props.image}) center center / 0px 0px no-repeat;
    overflow: hidden;

    &:before {
        content: '';
        position: absolute;
        inset: 0px;
        background-image: inherit;
        background-position: inherit;
        background-size: cover;
        filter: blur(20px);
    }

    ${props => (props.page === 'main' ? `&:after {
        content: '';
        position: absolute;
        inset: 0px;
        background: rgba(0, 0, 0, 0.7);
    }` : '')}
`;