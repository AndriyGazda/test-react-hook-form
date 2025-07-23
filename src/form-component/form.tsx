import { useForm, useFieldArray } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import './form.css';

type TFormData = {
  name: string;
  email: string;
  messageForName: string;
  education: {
    kindergarten: string;
    school: string;
    university: string;
  };
  phoneNumber: string[];
  // phNumbers: {
  //   number: string;
  // }[];
  taskAdd: {
    task: string;
  }[]
};

const FormComponent = () => {
  const { register, handleSubmit, reset, control, formState } =
    useForm<TFormData>(
      // {
      //   defaultValues: async () => {
      //     const response = await fetch(
      //       'https://jsonplaceholder.typicode.com/users/1'
      //     );
      //     const data = await response.json();
      //     return {
      //       name: 'Andrii',
      //       email: data.email,
      //       messageForName: data.name
      //     };
      //   }
      // }

      {
        defaultValues: {
          name: 'Andrii',
          email: '',
          messageForName: '',
          education: {
            kindergarten: '',
            school: '',
            university: ''
          },
          phoneNumber: ['', ''],
          // phNumbers: [{ number: '' }],
          taskAdd: [{task:''}]
        }
      }
    );
  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    name: 'taskAdd',
    control
  });

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
        <p className={'error'}>{errors.name?.message}</p>

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
        <p className={'error'}>{errors.email?.message}</p>

        {/*<textarea*/}
        {/*  {...register('messageForName', {*/}
        {/*    required: {*/}
        {/*      value: true,*/}
        {/*      message: 'Message is required'*/}
        {/*    }*/}
        {/*  })}*/}
        {/*  rows={10}*/}
        {/*  cols={10}*/}
        {/*/>*/}
        {/*<p className={'error'}>{errors.messageForName?.message}</p>*/}

        <label htmlFor="kindergarten">Kindergarten:</label>
        <input
          type="text"
          id="kindergarten"
          {...register('education.kindergarten', {
            required: 'Kindergarten is required'
          })}
        />
        <p className={'error'}>{errors.education?.kindergarten?.message}</p>

        <label htmlFor="school">School:</label>
        <input
          type="text"
          id="school"
          {...register('education.school', { required: 'School is required' })}
        />
        <p className={'error'}>{errors.education?.school?.message}</p>

        <label htmlFor="university">University:</label>
        <input
          type="text"
          id="university"
          {...register('education.university', {
            required: 'University is required'
          })}
        />
        <p className={'error'}>{errors.education?.university?.message}</p>

        <label htmlFor="primaryPhone">Primary phone number:</label>
        <input
          type="text"
          id="primaryPhone"
          {...register('phoneNumber.0', {
            required: 'Primary phone is required'
          })}
        />
        <p className={'error'}>{errors.phoneNumber?.[0]?.message}</p>

        <label htmlFor="secondaryPhone">Secondary phone number:</label>
        <input
          type="text"
          id="secondaryPhone"
          {...register('phoneNumber.1', {
            required: 'Secondary phone is required'
          })}
        />
        <p className={'error'}>{errors.phoneNumber?.[1]?.message}</p>

        <div>
          <label>List of task</label>
          <div>
            {fields.map((task, index)=> {
              return (<div                   key={task.id}
              >
                <input
                  type="text"
                  {...register(`taskAdd.${index}.task` as const)}/>
                { index > 0 &&
                  <button type = "button"
                         onClick = {() => remove(index)}> Remove task</button>
                }
              </div>)
            })}

            <button type="button" onClick={()=> append({task: ""})}>Add new Task</button>
          </div>
        </div>


        {/*<div>*/}
        {/*  <label>List of phone numbers</label>*/}
        {/*  <div>*/}
        {/*    {fields.map((field, index) => {*/}
        {/*      return (*/}
        {/*        <>*/}
        {/*          <input*/}
        {/*            key={field.id}*/}
        {/*            type="text"*/}
        {/*            {...register(`phNumbers.${index}.number` as const)}*/}
        {/*          />*/}
        {/*          {index > 0 && (*/}
        {/*            <button type={'button'} onClick={() => remove(index)}>*/}
        {/*              Remove*/}
        {/*            </button>*/}
        {/*          )}*/}
        {/*        </>*/}
        {/*      );*/}
        {/*    })}*/}
        {/*    <button type={'button'} onClick={() => append({ number: '' })}>*/}
        {/*      Append number*/}
        {/*    </button>*/}
        {/*  </div>*/}
        {/*</div>*/}

        <div className="button-wrapper">
          <button type="submit">Submit</button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};
export default FormComponent;
