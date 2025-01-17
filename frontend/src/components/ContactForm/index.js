import { useRef, useState } from 'react';

import { Form, ButtonContainer } from './styles';

import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';

export default function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState([]);

  function handleNameChange(event) {
    setName(event.target.value);

    // usamos o event.target.value ao invés de name, por conta da assincronicidade do setState
    if (!event.target.value) {
      setErrors((prevErrors) => [
        ...prevErrors,
        {
          field: 'name',
          message: 'Campo obrigatório',
        },
      ]);
    } else {
      // se o campo name estiver preenchido, queremos remover erro com field name
      // filtra todos os erros cujo field seja diferente de name
      setErrors((prevErrors) =>
        prevErrors.filter((error) => error.field !== 'name'),
      );
    }
  }

  console.log(errors);

  function handleSubmit(event) {
    event.preventDefault(); // previne o comportamento padrão do formulário (recarregar a página)

    console.log({
      name,
      email,
      phone,
      category,
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        {/* O valor do input é controlado pelo estado name */}
        <Input placeholder="Nome" value={name} onChange={handleNameChange} />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder="Telefone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Categoria</option>
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
