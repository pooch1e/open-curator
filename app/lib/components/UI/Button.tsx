type ButtonProps = {
  text: string;
  handleClick?: () => void;
  'aria-label'?: string;
};

export default function Button({ text, handleClick, 'aria-label': ariaLabel }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel || text}
      className="text-white text-2xl underline underline-offset-4 hover:text-red-300 focus:text-red-500 ">
      {text}
    </button>
  );
}
