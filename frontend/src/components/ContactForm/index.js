import { useState } from 'react';

import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';

import { Form, ButtonContainer } from './styles';

import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';

import useErrors from '../../hooks/useErrors';

export default function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');

  const { errors, setError, removeError, getErrorMessageByFieldName } =
    useErrors();

  const isFormValid = name && errors.length === 0;

  function handleNameChange(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: 'name', message: 'Nome obrigatório' });
    } else {
      removeError('name');
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({
        field: 'email',
        message: 'Email inválido',
      });
    } else {
      removeError('email');
    }
  }

  function handlePhoneChange(event) {
    setPhone(formatPhone(event.target.value));
  }

  function handleSubmit(event) {
    event.preventDefault(); // previne o comportamento padrão do formulário (recarregar a página)

    console.log({
      name,
      email,
      phone: phone.replace(/\D/g, ''),
      category,
    });
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        {/* O valor do input é controlado pelo estado name */}
        <Input
          placeholder="Nome *"
          value={name}
          onChange={handleNameChange}
          error={getErrorMessageByFieldName('name')}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
          error={getErrorMessageByFieldName('email')}
        />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder="Telefone"
          value={phone}
          onChange={handlePhoneChange}
          maxLength="15"
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
        <Button type="submit" disabled={!isFormValid}>
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
}
