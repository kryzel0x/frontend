import { forwardRef, HTMLAttributes } from "react";
import { clsx } from "../../../../utils/utils";
import "./Error.scss";

type PropTypes = HTMLAttributes<HTMLSpanElement> & {

}

const Error = forwardRef<HTMLSpanElement, PropTypes>(({ children, className, ...rest }, ref) => {
    return (
        <span ref={ref} {...rest} className={clsx("custom_error", className)}>
            {children}
        </span>
    );
});

export default Error;