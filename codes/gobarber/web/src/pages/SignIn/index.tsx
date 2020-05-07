import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/all';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { user, signIn } = useAuth();
  const { addToast } = useToast();
  // console.log(signIn);
  console.log(user);
  // console.log(formRef.current);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      console.log(data);

      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string().required('Email obrigatorio').email('Digite um email valido'),
          password: Yup.string().required('Senha obrigatoria'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (error) {
        console.log(error);

        const errors = getValidationErrors(error);

        formRef.current?.setErrors(errors);
      }

      addToast({
        type: 'error',
        title: 'Erro na autenticacao',
        description: 'Occoreu um error durante o login',
      });
    },
    // if you are using external variable you must put it as dependence of useCallBack
    [signIn, addToast],
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Gobarber" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1> Faça seu logon</h1>

          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
          <Button type="submit">Entrar</Button>
          <a href="forgot">Esqueci minha senha</a>
        </Form>
        <a href="login">
          <FiLogIn />
          Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};
export default SignIn;
