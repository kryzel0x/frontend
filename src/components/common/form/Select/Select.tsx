import ReactSelect, { Props } from "react-select";
import { clsx } from "../../../../utils/utils";
import Error from "../Error/Error";
import Label from "../Label/Label";
import "./Select.scss";

type PropTypes = Props & {
    label?: string;
    error?: any;
};

const Select = ({
    name,
    id,
    error,
    className,
    label,
    ...rest
}: PropTypes) => {
    return (
        <div className={clsx("custom_select", className)}>
            {label && <Label htmlFor={name}>{label}</Label>}
            <ReactSelect
                {...rest}
                name={name}
                classNamePrefix="select"
                
            />
            {error && <Error>{error}</Error>}
        </div>
    );
};

export default Select;
