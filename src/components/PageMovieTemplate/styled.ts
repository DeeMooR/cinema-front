import styled from 'styled-components';

export const BackgroundImage = styled.div<{ image: string }>`
    width: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    bottom: 0px;
    filter: blur(10px);
    opacity: 0.1;
    background: url(${props => props.image}) center center / cover no-repeat fixed;
`;