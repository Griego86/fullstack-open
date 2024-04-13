const ErrorMessage = ({error}) => {
  if (error === null) {
    return null
  }

  return(
    <div className="fail" >
      {error}
    </div>
  )
}

export default ErrorMessage