import { StyledSpinner } from './styles';

export default function Spinner({ size = 40 }) {
  return (
    <StyledSpinner size={size}>
      <svg viewBox="25 25 50 50">
        <title>Loading...</title>
        <circle r="20" cy="50" cx="50" />
      </svg>
    </StyledSpinner>
  );
}
