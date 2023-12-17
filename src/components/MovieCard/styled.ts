import styled from 'styled-components';

export const StyledImage = styled.div<{ image: string }>`
    width: 100%;
    height: 0px;
    padding-bottom: 160%;
    background: url(${props => props.image}) no-repeat center;
    background-size: cover;
    border-radius: 25px;
    cursor: pointer;
    filter: brightness(90%);
    transition: all 0.2s ease 0s;

    &:hover {
        filter: brightness(105%);
        transition: all 0.3s ease 0s;
    }
`;