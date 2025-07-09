import { SVGProps } from 'react';

export default function UploadFiles(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4 24C4 14.5719 4 9.85786 6.92894 6.92894C9.85786 4 14.5719 4 24 4C33.428 4 38.1422 4 41.071 6.92894C44 9.85786 44 14.5719 44 24C44 33.428 44 38.1422 41.071 41.071C38.1422 44 33.428 44 24 44C14.5719 44 9.85786 44 6.92894 41.071C4 38.1422 4 33.428 4 24Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M30 24H24M24 24H18M24 24V18M24 24V30"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
