/**
 * Button — underlined text button used for navigation and page actions;
 * renders a Next Link when given an href so links aren't nested in buttons.
 */
import Link from 'next/link';

type ButtonProps = {
  text: string;
  href?: string;
  handleClick?: () => void;
  'aria-label'?: string;
};

const BUTTON_STYLE =
  'text-2xl font-crimson font-medium underline underline-offset-4 text-white hover:text-red-500 transition-colors duration-300 cursor-pointer';

export default function Button({
  text,
  href,
  handleClick,
  'aria-label': ariaLabel,
}: ButtonProps) {
  if (href) {
    return (
      <Link href={href} aria-label={ariaLabel} className={BUTTON_STYLE}>
        {text}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel}
      className={BUTTON_STYLE}>
      {text}
    </button>
  );
}
