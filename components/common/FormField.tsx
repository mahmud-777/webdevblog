
import { cn } from '@/lib/utils';

import { FieldErrors, Path, UseFormRegister, FieldValues} from 'react-hook-form'

interface FormFieldProps<T extends FieldValues> {
  id: string;
  type?: string;
  disabled?: boolean;
  placeholder: string;
  label?: string;
  inputClassName?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors
  
}

const FormField = <T extends FieldValues> ({id,type, disabled, placeholder, label, inputClassName, register, errors}: FormFieldProps<T>) => {
  
  const message = errors[id] && errors[id]?.message as string; 

  return ( 
    <div>
      {label && <span  className='block text-sm '>{label}</span>}
      <input 
       id={id} 
        type={type} 
        disabled={disabled} 
        placeholder={placeholder}
        {...register(id as Path<T>, {required: true})}
        className={cn("w-full p-3 my-2 outline-none rounded-md  disabled:opacity-70 disabled:cursor-not-allowed border borer-slate-300  dark:border-slate-700", errors[id] && "border-rose-400", inputClassName)} 

      />      
      {message && <span className='text-sm text-rose-400'>{message}</span>}
    </div>
   );
}
 
export default FormField;