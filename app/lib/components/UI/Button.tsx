type ButtonProps = {
  text: string;
};

export default function Button({ text }: ButtonProps) {
  return (
    <button
      type="button"
      className="text-white text-2xl underline underline-offset-4">
      {text}
    </button>
  );
}
