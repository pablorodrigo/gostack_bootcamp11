import React, { FormEvent, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../../services/api';
import { Form, Title, Repositories } from './styles';

import logoImg from '../../../assets/logo.svg';

// I should put when I know types of data returned from API
interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepository, setNewRepository] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>([]);

  // it will add new repository
  async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    const response = await api.get(`/repos/${newRepository}`);

    const repository = response.data;

    setRepositories([...repositories, repository]);

    setNewRepository('');
  }

  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>GitHub Repositories</Title>
      <Form onSubmit={handleAddRepository}>
        <input
          value={newRepository}
          onChange={(text) => setNewRepository(text.target.value)}
          placeholder="Type the name of repository"
        />
        <button type="submit">Search</button>
      </Form>

      <Repositories>
        {repositories.map((repository) => (
          <a key={repository.full_name} href="test">
            <img src={repository.owner.avatar_url} alt={repository.owner.login} />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
