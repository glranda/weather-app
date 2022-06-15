import type { ComponentProps } from "../componentProps/ComponentProps.type";

export function Display(props: ComponentProps) {
  return (
    <div className="f f1 jcc aic w100pc fdc">
      {props.children}
    </div>
  )
}
