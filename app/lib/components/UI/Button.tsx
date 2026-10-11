/**
 * Button — underlined text button used for navigation and page actions;
 * renders a Next Link when given an href so links aren't nested in buttons.
 */
import Link from 'next/link';

type ButtonState = 'active' | 'cleared' | 'disabled';

type ButtonProps = {
  text: string;
  href?: string;
  handleClick?: () => void;
  'aria-label'?: string;
  state?: ButtonState;
};

const BASE_STYLE =
  'text-2xl font-crimson font-medium underline underline-offset-4 transition-all duration-300';

const STATE_STYLES: Record<ButtonState, string> = {
  active: 'text-white hover:text-red-600 focus:text-red-400 cursor-pointer',
  cleared: 'text-green-400 hover:text-green-300 cursor-pointer',
  disabled: 'text-gray-500 cursor-not-allowed opacity-70',
};

export default function Button({
  text,
  href,
  handleClick,
  'aria-label': ariaLabel,
  state = 'active',
}: ButtonProps) {
  const className = `${BASE_STYLE} ${STATE_STYLES[state]}`;

  if (href) {
    return (
      <Link href={href} aria-label={ariaLabel} className={className}>
        {text}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel}
      disabled={state === 'disabled'}
      className={className}>
      {text}
    </button>
  );
}
