import { useForm } from 'react-hook-form';

type TFormData = {
  name: string;
  email: string;
};

const FormComponent = () => {
  const { register, handleSubmit } = useForm<TFormData>();

  const handleFormSubmit = (data: TFormData) => {
    console.log('Form submitted with data:', data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" {...register('name', { required: true })} />

      <label htmlFor="email">Email:</label>
      <input type="email" id="email" {...register('email')} />

      <button type="submit">Submit</button>
    </form>
  );
};
export default FormComponent;
