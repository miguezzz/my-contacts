import { Container } from './styles';

export default function FormGroup({ children, error, isLoading }) {
  return (
    <Container>
      <div className="form-item">
        {children}

        {isLoading && (
          <div className="loader">
            <svg viewBox="25 25 50 50">
              <title>Loading...</title>
              <circle r="20" cy="50" cx="50" />
            </svg>
          </div>
        )}
      </div>

      {error && <small>{error}</small>}
    </Container>
  );
}
