import { Link } from 'react-router';

type RouterLinkProps = {
  children: React.ReactNode;
  href: string;
} & React.ComponentProps<'a'>;

export const RouterLink = ({ children, href, ...props }: RouterLinkProps) => {
  return (
    <Link to={href} {...props}>
      {children}
    </Link>
  );
};
