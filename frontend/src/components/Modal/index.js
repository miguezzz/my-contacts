import { Overlay, Container, Footer } from './styles';

import Button from '../Button';

export default function Modal() {
  return (
    <Overlay>
      <Container>
        <h1>modal title</h1>

        <p>modal body</p>

        <Footer>
          <button type="button" className="cancel-button">
            Cancelar
          </button>
          <Button>Deletar</Button>
        </Footer>
      </Container>
    </Overlay>
  );
}
