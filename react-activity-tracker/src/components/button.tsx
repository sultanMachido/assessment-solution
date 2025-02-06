import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  customStyle: string;
  click: () => void;
};

const Button = ({ children, customStyle, click }: ButtonProps) => {
  return (
    <button className={customStyle} onClick={click}>
      {children}
    </button>
  );
};

export default Button;
