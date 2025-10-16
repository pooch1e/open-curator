type ButtonProps = {
  text: string;
  handleClick?: () => void;
  'aria-label'?: string;
  state?: 'active' | 'cleared' | 'disabled';
};

export default function Button({
  text,
  handleClick,
  'aria-label': ariaLabel,
  state = 'active',
}: ButtonProps) {
  const baseStyle =
    'text-2xl font-crimson font-medium underline underline-offset-4 transition-all duration-300';
  const states = {
    active: 'text-white hover:text-red-600 focus:text-red-400',
    cleared: 'text-green-400 hover:text-green-300',
    disabled: 'text-gray-500 cursor-not-allowed opacity-70',
  };

  return (
    <button
      type="button"
      onClick={state === 'disabled' ? undefined : handleClick}
      aria-label={ariaLabel || text}
      disabled={state === 'disabled'}
      className={`${baseStyle} ${states[state]}`}>
      {text}
    </button>
  );
}
