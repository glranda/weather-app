import type { ComponentProps } from "../componentProps/ComponentProps.type";

export function BottomBar(props: ComponentProps) {
  return (
    <div className="f f1 jcc pt1 w100pc mb2 aife">
      <div className="tac">
        {props.children}
      </div>
    </div>
  )
}
