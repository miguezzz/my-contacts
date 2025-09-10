import Spinner from '../Spinner';
import { StyledButton } from './styles';

export default function Button({ type, disabled, isLoading, children, }) {
  return (
    <StyledButton type={type} disabled={disabled || isLoading}>
      {!isLoading && children}
      {isLoading && <Spinner size={16} />}
    </StyledButton>
  )
}
