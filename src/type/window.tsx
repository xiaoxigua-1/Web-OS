
export interface windows {
    windows: Array<window>,
    windowsZIndex: Array<number>,
    windowHide: (index: number) => void,
    windowDelete: (index: number) => void
}

export interface window {
    title: string,
    icon: string,
    width: number,
    height: number,
    top: number,
    left: number,
    fit: string,
    style: React.CSSProperties,
    outsudeFrameStyle: string
    app: JSX.Element
}