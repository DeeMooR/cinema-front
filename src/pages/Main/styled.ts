import styled from 'styled-components';

export const BackgroundSlider = styled.div<{ image: string }>`
    background: url(${props => props.image}) center top / 100% no-repeat, linear-gradient(rgba(24, 24, 24, 0.8), rgb(24, 24, 24));
`;