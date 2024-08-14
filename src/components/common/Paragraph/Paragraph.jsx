


export const Paragraph = ({ children, type, color, style, center = false }) => {

    switch (type) {
        case "heading":
            return (
                <div style={style} className={`font-Golos text-xl tracking-tighter leading-5 font-semibold opacity-85 ${center && 'text-center'} ${color || "text-[#0c1016]"}`}>
                    {children}
                </div>
            )
        case "postheading":
            return (
                <div style={style} className={`font-Golos text-2xl leading-5 font-bold ${center && 'text-center'} ${color || "text-[[#0c1016]]"}`}>
                    {children}
                </div>
            )
        case "semiheading":
            return (
                <div style={style} className={`font-Golos text-base leading-5 font-semibold ${center && 'text-center'} ${color || "text-black-700"}`}>
                    {children}
                </div>
            )
        case "master":
            return (
                <div style={style} className={`font-Golos text-sm leading-5 font-semibold ${center && 'text-center'} ${color || "text-black-500"}`}>
                    {children}
                </div>
            )
        case "title":
            return (
                <div style={style} className={`font-Golos text-[13px] tracking-wide leading-4 font-normal ${center && 'text-center'} ${color || "text-[#666]"}`}>
                    {children}
                </div>
            )
        default:
            return (
                <div style={style} className={`font-Golos text-[13px] tracking-wide leading-4 font-normal flex flex-row gap-2 ${center && 'justify-center'} ${color || "text-black-700"}`}>
                    {children}
                </div>
            )
    }
}