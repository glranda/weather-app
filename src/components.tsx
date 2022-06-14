import React from 'react';

type Props = { 
  children: React.ReactNode
}

export function Clock(props: Props) {
  return (
    <div className="f f1 jcr w100pc asfs pb1 pt1 tar">
      <div>
        {props.children}
      </div>
    </div>
  )
}

export function Display(props: Props) {
  return (
    <div className="f f1 jcc aic w100pc fdc">
      {props.children}
    </div>
  )
}

export function BottomBar(props: Props) {
  return (
    <div className="f f1 jcc pt1 w100pc mb2 aife">
      {props.children}
    </div>
  )
}
