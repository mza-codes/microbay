import * as React from "react";
import { render } from "react-dom";
import photos from "./photos";
import Styled from "./styles";

const sideScroll = (
    element: HTMLDivElement,
    speed: number,
    distance: number,
    step: number
) => {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
        element.scrollLeft += step;
        scrollAmount += Math.abs(step);
        if (scrollAmount >= distance) {
            clearInterval(slideTimer);
        }
    }, speed);
};
const contentWrapper = React.useRef(null);
return (
    <Styled.Container>
        <Styled.Title>Horizontal Scroll Buttons</Styled.Title>
        <Styled.ContentWrapper ref={contentWrapper}>
            {photos.map((url, i) => (
                <Styled.Content url={url} key={`img-${i}`} />
            ))}
        </Styled.ContentWrapper>

        <Styled.ButtonWrapper>
            <Styled.Button
                onClick={() => {
                    sideScroll(contentWrapper.current, 25, 100, -10);
                }}
            >
                Left
            </Styled.Button>
            <Styled.Button
                onClick={() => {
                    sideScroll(contentWrapper.current, 25, 100, 10);
                }}
            >
                Right
            </Styled.Button>
        </Styled.ButtonWrapper>
    </Styled.Container>
)