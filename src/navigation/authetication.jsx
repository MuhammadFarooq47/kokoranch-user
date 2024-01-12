import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children, redirectTo }) {
  const { isAuthenticated, userType } = useSelector(
    (state) => state.authReducer,
  )
return isAuthenticated ? children : <Navigate to={redirectTo} />
}

export default ProtectedRoute
