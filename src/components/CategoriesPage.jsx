import React, { useContext } from 'react';
import cuid from 'cuid';
import { OptionsContext } from '../context/OptionsContext';
import RadioInput from './Shared/RadioInput';

function CategoriesPage() {
  const { category, setCategory } = useContext(OptionsContext);

  function handleChange(event) {
    setCategory(event.target.value);
  }

  const categories = [
    { id: cuid(), value: 'funny', label: 'Funny' },
    { id: cuid(), value: 'challenging', label: 'Challenging' },
    { id: cuid(), value: 'uncensored', label: 'Uncensored' }
  ];

  return (
    <RadioInput
      vertical
      name="category"
      value={category || ''}
      optionsArray={categories}
      handleChange={handleChange}
    />
  );
}

export default CategoriesPage;