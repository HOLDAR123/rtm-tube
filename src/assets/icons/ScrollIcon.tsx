import { SVGProps } from 'react';

export default function ScrollIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.5694 9.84591C19.839 10.1604 19.8026 10.6339 19.4881 10.9034L12.4881 16.9035C12.2072 17.1442 11.7928 17.1442 11.5119 16.9035L4.5119 10.9034C4.1974 10.6339 4.161 10.1604 4.4305 9.8459C4.7001 9.53141 5.1736 9.49498 5.4881 9.76455L12 15.3462L18.5119 9.76455C18.8264 9.49498 19.2999 9.53142 19.5694 9.84591Z"
        fill="currentColor"
      />
    </svg>
  );
}
