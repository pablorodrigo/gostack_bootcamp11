import React from 'react';

import {FiChevronRight} from 'react-icons/fi';
import {Form, Title, Repositories} from './styles';

import logoImg from '../../../assets/logo.svg';

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg}
           alt="Github Explorer" />
      <Title>GitHub Repositories</Title>
      <Form>
        <input placeholder="Type the name of repository" />
        <button type="submit">Search</button>
      </Form>

      <Repositories>
        <a href="test">
          <img
            src="https://avatars0.githubusercontent.com/u/6105149?s=460&u=d58cec4a12fcb354be57b50e72180f9de07a8393&v=4"
            alt="Pablo Perfil"
          />
          <div>
            <strong>rocketseat</strong>
            <p>text text text</p>
          </div>
          <FiChevronRight size={20} />
        </a>

      </Repositories>
    </>
  );
};

export default Dashboard;
