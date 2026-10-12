import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

type HeaderProps = DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
> & {
  size?: "sm" | "md" | "lg";
};

const T = {
  Header: ({ children, size, ...props }: HeaderProps) => {
    const classes = `${size === "sm" ? "text-lg" : size === "lg" ? "text-2xl" : "text-xl"}`
    return (
      <p className={classes} {...props}>
        {children}
      </p>
    );
  },
};

export default T;
