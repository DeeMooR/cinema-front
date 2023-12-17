import styled from 'styled-components';

export const StyledIcon = styled.div<{ image: {light: string, dark: string} }>`
    width: 36px;
    height: 36px;
    background: url(${({image}) => image.light}) no-repeat center;
    background-size: 16px 16px;
    border: 2px solid #fff;
    border-radius: 50%;
    transition: all 0.2s ease 0s;

    &:hover {
        background: #fff url(${({image}) => image.dark}) no-repeat center;
        background-size: 16px 16px;
        transition: all 0.3s ease 0s;
    }
`;