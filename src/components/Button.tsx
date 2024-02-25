
type ButtonProps = {
    children: string;
    onClick: () => void;
    style: "primary" | "secondary";
    disabled: boolean;
}

const Button = (props: ButtonProps) => {
    return (
        <button onClick={props.onClick} className={`w-[18rem] py-2 transition font-medium text-center cursor-pointer rounded-full max-w-sm border-[2px] ${props.style === 'secondary' ? 'bg-white text-[#1e1e1e] border-[#1e1e1e] hover:bg-[#232323] hover:text-white' : "text-white bg-[#1e1e1e] border-[#1e1e1e] hover:bg-[#2a2a2a]"}`}>{props.children}</button>
    )
}

export default Button