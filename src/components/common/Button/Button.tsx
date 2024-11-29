import { ButtonHTMLAttributes } from "react";
import { clsx } from "../../../utils/utils";
import Spinner from "../Spinner/Spinner.tsx";
import "./Button.scss";

type PropTypes = ButtonHTMLAttributes<HTMLButtonElement> & {
    fluid?: boolean,
    text?: string,
    loading?: boolean,
}

const Button = ({ children, loading, className, text, fluid, ...rest }: PropTypes) => {
    return (
        <button
            type="button"
            {...rest}
            className={clsx("custom_btn", className, fluid && "w-100")}
        >
            {
                loading ?
                    <Spinner />
                    :
                    text || children
            }
        </button>
    )
}

export default Button