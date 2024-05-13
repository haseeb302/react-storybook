import { cva, VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import {
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from "../../utils/types";
import { cn } from "../../utils";

const textStyles = cva("w-full", {
  variants: {
    emphasis: {
      low: "text-gray-600 font-light",
      medium: "text-gray-800 font-medium",
      high: "text-gray-900 font-semibold",
    },
    size: {
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
    },
    weight: {
      fontBlack: "font-black",
      fontBold: "font-bold",
      thin: "font-thin",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    italic: {
      true: "italic",
    },
    underline: {
      true: "underline underline-offset-2",
    },
  },
  defaultVariants: {
    size: "base",
    align: "left",
  },
});

type TextProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<
  C,
  VariantProps<typeof textStyles>
>;

type TextComponent = <C extends React.ElementType = "span">(
  props: TextProps<C>
) => React.ReactElement | null;

// @ts-expect-error - unexpected typing errors
export const Text: TextComponent = forwardRef(
  <C extends React.ElementType = "span">(
    {
      as,
      align,
      size,
      emphasis,
      weight,
      italic,
      underline,
      className,
      ...props
    }: TextProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as || "span";
    return (
      <Component
        ref={ref}
        className={cn(
          textStyles({ align, size, emphasis, weight, italic, underline })
        )}
        {...props}
      />
    );
  }
);
