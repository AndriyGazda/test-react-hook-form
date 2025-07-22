import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import './form.css';

type TFormData = {
  name: string;
  email: string;
  messageForName: string;
};

const FormComponent = () => {
  const { register, handleSubmit, reset, control, formState } =
    useForm<TFormData>(
      {
        defaultValues: async () => {
          const response = await fetch(
            'https://jsonplaceholder.typicode.com/users/1'
          );
          const data = await response.json();
          return {
            name: 'Andrii',
            email: data.email,
            messageForName: data.name
          };
        }
      }
      // {
      // defaultValues: {
      //   name: 'Andrii',
      //   email: 'andriy@gmail.com',
      //   messageForName: ''
      // }}
    );
  const { errors } = formState;

  const handleFormSubmit = (data: TFormData) => {
    console.log('Form submitted with data:', data);
    reset();
  };

  return (
    <div className={'form-container'}>
      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          {...register('name', {
            required: 'Username is required'
          })}
        />
        <h3 className={'error'}>{errors.name?.message}</h3>

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          {...register('email', {
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: 'Invalid Email format'
            },
            // validate: (fieldValue)=>{
            //     return fieldValue !== "admin@example.com" ||
            //       "Enter a different email address"
            // }
            validate: {
              notAdmin: fieldValue => {
                return (
                  fieldValue !== 'admin@example.com' ||
                  'Enter a different email address'
                );
              },
              notBlackList: fieldValue => {
                return (
                  !fieldValue.endsWith('baddomain.com') ||
                  'This domain is not suppoted'
                );
              }
            }
          })}
        />
        <h3 className={'error'}>{errors.email?.message}</h3>

        <textarea
          {...register('messageForName', {
            required: {
              value: true,
              message: 'Message is required'
            }
          })}
          rows={10}
          cols={10}
        />
        <h3 className={'error'}>{errors.messageForName?.message}</h3>

        <div className="button-wrapper">
          <button type="submit">Submit</button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};
export default FormComponent;
