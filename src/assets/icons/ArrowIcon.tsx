import { SVGProps } from 'react';

export default function ArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.67461 2.95436C5.88427 2.77465 6.19993 2.79894 6.37964 3.0086L10.3797 7.67525C10.5401 7.86252 10.5401 8.13879 10.3797 8.32605L6.37964 12.9927C6.19993 13.2024 5.88427 13.2267 5.67461 13.047C5.46495 12.8673 5.44067 12.5516 5.62038 12.3419L9.34147 8.00065L5.62038 3.65939C5.44067 3.44972 5.46495 3.13408 5.67461 2.95436Z"
        fill="currentColor"
      />
    </svg>
  );
}
