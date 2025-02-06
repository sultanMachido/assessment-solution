type TextInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  type: "text" | "email" | "search";
};

const TextInput = ({ type, ...props }: TextInputProps) => {
  return (
    <input
      type={type}
      {...props}
      className="w-full h-[40px] p-2  border border-black rounded-md outline-none"
    />
  );
};

export default TextInput;
