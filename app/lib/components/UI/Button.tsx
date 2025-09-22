type ButtonProps = {
  text: string;
};

export default function Button({ text }: ButtonProps) {
  return (
    <button
      type="button"
      className="text-white text-2xl underline underline-offset-4 hover:text-red-300 focus:text-red-500 ">
      {text}
    </button>
  );
}
