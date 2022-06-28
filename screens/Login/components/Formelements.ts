import { FormFactory } from 'components/Forms/formTypes'

export const FormElementsLogin: FormFactory.FormFactoryType[] = [
  {
    name: 'email',
    type: 'email',
    // defaultValue: 'avilas_ataq@hotmail.com',
    defaultValue: 'joeldzv95@gmail.com',
    // defaultValue: 'aideawebdesign@gmail.com',

    required: true,
    placeholder: 'Email',
    adicionalProps: {
      size: 'large'
    },
    label: true,
    showIcon: true
  },
  {
    name: 'password',
    type: 'password',
    // defaultValue: '3rlxeV01KUJNEpfVxEhyGSoLSMrM4n8hhSRMz3lL',
    // defaultValue: 'e7ea77317',

    defaultValue: '12345',
    required: true,
    placeholder: 'Contraseña',
    adicionalProps: {
      size: 'large'
    },
    label: true
  },
  {
    name: 'worker',
    type: 'boolean',
    label: true,
    placeholder: 'Soy trabajador'
    // defaultValue: true
  }
]
