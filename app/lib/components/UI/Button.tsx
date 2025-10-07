type ButtonProps = {
  text: string;
  handleClick: () => void
};

export default function Button({ text, handleClick }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-white text-2xl underline underline-offset-4 hover:text-red-300 focus:text-red-500 ">
      {text}
    </button>
  );
}
