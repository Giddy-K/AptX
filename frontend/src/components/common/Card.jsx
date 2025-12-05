import { clsx } from 'clsx';

const Card = ({
  children,
  className,
  hover = false,
  padding = true,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'bg-white rounded-lg shadow-sm border border-gray-200',
        padding && 'p-6',
        hover && 'transition hover:shadow-md',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
