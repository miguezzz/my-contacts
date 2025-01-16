import { useRef, useState } from 'react';

import { Form, ButtonContainer } from './styles';

import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';

export default function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');

  // const emailInput = document.getElementById('input-email');
  // nao se pode acessar o DOM diretamente no react por causa da virtual DOM
  // o react nao sabe que o DOM foi alterado e nao atualiza a pagina

  const emailInput = useRef(null);

  function handleClick() {
    console.log(emailInput.current.value);
  }

  return (
    <Form>
      <button type="button" onClick={handleClick}>
        Logar emailInput
      </button>
      <FormGroup>
        {/* O valor do input é controlado pelo estado name */}
        <Input
          value={name}
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Input placeholder="E-mail" ref={emailInput} />
      </FormGroup>

      <FormGroup>
        <Input placeholder="Telefone" />
      </FormGroup>

      <FormGroup>
        <Select>
          <option value="instagram">Instagram</option>
          <option value="faculdade">Faculdade</option>
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit">{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
}
