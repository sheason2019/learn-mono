import { JSX } from "preact";
import "./index.css";

interface FormInputProps {
  type: "text" | "password";
  placeholder: string;
  onChange: (e: JSX.TargetedEvent<HTMLInputElement, Event>) => void;
  value: string;
}

export function FormInput(props: FormInputProps) {
  return (
    <input type={props.type} placeholder={props.placeholder} value={props.value} onChange={props.onChange} />
  );
}
