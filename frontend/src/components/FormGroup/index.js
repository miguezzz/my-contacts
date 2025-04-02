import { Container } from './styles';

import Spinner from '../Spinner';

export default function FormGroup({ children, error, isLoading }) {
  return (
    <Container>
      <div className="form-item">
        {children}

        {isLoading && <Spinner />}
      </div>

      {error && <small>{error}</small>}
    </Container>
  );
}
