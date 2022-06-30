import type { ComponentProps } from "../componentProps/ComponentProps.type";

export function Clock(props: ComponentProps) {
  return (
    <div className="f f1 jcr w100pc asfs pb1 pt1 tar">
      <div>
        {props.children}
      </div>
    </div>
  );
}
