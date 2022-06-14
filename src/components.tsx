import React from 'react';

type Props = { 
  children: React.ReactNode
}

export function Clock(props: Props) {
  return (
    <div className="f jcr w100pc tac asfs pb1 pt1 tar">
      <div>
        {props.children}
      </div>
    </div>
  )
}

export function Display(props: Props) {
  return (
    <div className="f jcc aic poa w100pc b0 t0 fdc">
      {props.children}
    </div>
  )
}

export function BottomBar(props: Props) {
  return (
    <div className="f jcc pt1 aic poa w100pc b0 tu">
      {props.children}
    </div>
  )
}
