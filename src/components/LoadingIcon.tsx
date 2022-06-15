export function LoadingIcon() {
  return (
    <div className="mt2 f jcc fdc aic">
      <p>Loading Location...</p>
      <span className="pb1 alert"></span>
      <img className="w140px icon" src={require('../spinning.png')} alt="Loading Location" />
    </div>
  )
}
