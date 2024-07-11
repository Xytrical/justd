import type { SVGProps } from 'react'

interface Props extends SVGProps<SVGSVGElement> {}

const Logo = (props: Props) => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width={24} height={24} rx={5.34} fill="#27272A" />
    <g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.1389 5H11.3611C10.9397 5 10.5997 4.99999 10.3244 5.02248C10.041 5.04564 9.79202 5.09457 9.56169 5.21193C9.19581 5.39835 8.89835 5.69581 8.71193 6.06169C8.59457 6.29202 8.54564 6.54098 8.52248 6.82442C8.49999 7.09971 8.5 7.43965 8.5 7.86111V8.11111H7.86113C7.43966 8.11111 7.09971 8.1111 6.82442 8.1336C6.54098 8.15675 6.29202 8.20568 6.06169 8.32304C5.69581 8.50946 5.39835 8.80693 5.21193 9.1728C5.09457 9.40313 5.04564 9.65209 5.02248 9.93554C4.99999 10.2108 5 10.5508 5 10.9722V16.1389C5 16.5603 4.99999 16.9003 5.02248 17.1756C5.04564 17.459 5.09457 17.708 5.21193 17.9383C5.39835 18.3042 5.69581 18.6016 6.06169 18.7881C6.29202 18.9054 6.54098 18.9544 6.82442 18.9775C7.09968 19 7.43957 19 7.86097 19H13.0278C13.4492 19 13.7892 19 14.0645 18.9775C14.3479 18.9544 14.5969 18.9054 14.8272 18.7881C15.1931 18.6016 15.4905 18.3042 15.677 17.9383C15.7943 17.708 15.8432 17.459 15.8664 17.1756C15.8889 16.9003 15.8889 16.5604 15.8889 16.1389V15.8889H16.1389C16.5603 15.8889 16.9003 15.8889 17.1756 15.8664C17.459 15.8432 17.708 15.7943 17.9383 15.677C18.3042 15.4905 18.6016 15.1931 18.7881 14.8272C18.9054 14.5969 18.9544 14.3479 18.9775 14.0645C19 13.7892 19 13.4493 19 13.0279V7.86112C19 7.43971 19 7.09968 18.9775 6.82442C18.9544 6.54098 18.9054 6.29202 18.7881 6.06169C18.6016 5.69581 18.3042 5.39835 17.9383 5.21193C17.708 5.09457 17.459 5.04564 17.1756 5.02248C16.9003 4.99999 16.5603 5 16.1389 5ZM15.8889 15.1111H16.1222C16.5642 15.1111 16.8724 15.1108 17.1122 15.0912C17.3476 15.072 17.4828 15.0361 17.5852 14.984C17.8047 14.8721 17.9832 14.6936 18.0951 14.4741C18.1472 14.3717 18.1831 14.2365 18.2023 14.0011C18.2219 13.7612 18.2222 13.4531 18.2222 13.0111V7.87778C18.2222 7.43576 18.2219 7.12764 18.2023 6.88776C18.1831 6.65242 18.1472 6.51721 18.0951 6.41479C17.9832 6.19527 17.8047 6.01679 17.5852 5.90494C17.4828 5.85275 17.3476 5.81691 17.1122 5.79768C16.8724 5.77808 16.5642 5.77778 16.1222 5.77778H11.3778C10.9358 5.77778 10.6276 5.77808 10.3878 5.79768C10.1524 5.81691 10.0172 5.85275 9.91479 5.90494C9.69527 6.01679 9.51679 6.19527 9.40494 6.41479C9.35275 6.51721 9.31691 6.65242 9.29768 6.88776C9.27808 7.12764 9.27778 7.43576 9.27778 7.87778V8.11111H13.0278C13.4492 8.11111 13.7892 8.1111 14.0645 8.1336C14.3479 8.15675 14.5969 8.20568 14.8272 8.32304C15.1931 8.50946 15.4905 8.80693 15.677 9.1728C15.7943 9.40313 15.8432 9.65209 15.8664 9.93554C15.8889 10.2108 15.8889 10.5507 15.8889 10.9722V15.1111Z"
        fill="white"
      />
      <path
        d="M8.5 17C8.08889 17 7.73611 16.8528 7.44167 16.5583C7.14722 16.2639 7 15.9111 7 15.5C7 15.0889 7.14722 14.7361 7.44167 14.4417C7.73611 14.1472 8.08889 14 8.5 14C8.91111 14 9.26389 14.1472 9.55833 14.4417C9.85278 14.7361 10 15.0889 10 15.5C10 15.7722 9.93056 16.0222 9.79167 16.25C9.65833 16.4778 9.47778 16.6611 9.25 16.8C9.02778 16.9333 8.77778 17 8.5 17Z"
        fill="#27272A"
      />
    </g>
  </svg>
)

export { Logo }