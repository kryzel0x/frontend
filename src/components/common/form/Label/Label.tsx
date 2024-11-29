import { forwardRef, LabelHTMLAttributes } from "react";
import { clsx } from "../../../../utils/utils";
import "./Label.scss";

type PropTypes = LabelHTMLAttributes<HTMLLabelElement> & {
    required?: boolean,
};

const Label = forwardRef<HTMLLabelElement, PropTypes>(({ children, required, className, ...rest }, ref) => {
    return (
        <label ref={ref} {...rest} className={clsx("custom_label", className)}>
            {children}
            {required ? <sup>*</sup> : null}
        </label>
    );
});

export default Label;