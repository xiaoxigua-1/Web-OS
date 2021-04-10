export interface windows {
    windows: Array<any>
}

export interface window {
    title: string,
    icon: string,
    width: number,
    height: number,
    top: number,
    left: number,
    style: React.CSSProperties,
    content: any
}