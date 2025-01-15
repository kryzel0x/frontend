import { InputHTMLAttributes, ReactNode } from "react";
import { clsx } from "../../../../utils/utils";
import Label from "../Label/Label";
import "./Input.scss";
import Error from "../Error/Error";

type PropTypes = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  icon?: ReactNode;
  rightIcon?: ReactNode;
  error?: any;
  isInvalid?: any;
};

const Input = ({
  name,
  id,
  icon,
  error,
  rightIcon,
  type,
  className,
  label,
  ...rest
}: PropTypes) => {
  return (
    <div className={clsx("custom_input", className)}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <div
        className={clsx(
          "input_in",
          icon && "icon_input",
          rightIcon && "right_icon_input",
          error && "error_input"
        )}
      >
        {icon && <div className="input_icon">{icon}</div>}
        <input type={type || "text"} {...rest} name={name} id={name} />
        {rightIcon && <div className="right_input_icon">{rightIcon}</div>}
      </div>
      {error && <Error>{error}</Error>}
    </div>
  );
};

export default Input;
