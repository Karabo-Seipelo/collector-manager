"use client";

import { TextField, type TextFieldProps } from "../text-field/text-field";

type MultilineTextFieldProps = Extract<TextFieldProps, { multiline: true }>;

export type TextAreaProps = Omit<
  MultilineTextFieldProps,
  "clearable" | "label" | "leadingIcon" | "multiline"
> & {
  label: string;
};

export function TextArea({ label, ...props }: TextAreaProps) {
  return <TextField {...props} label={label} multiline />;
}

export default TextArea;
