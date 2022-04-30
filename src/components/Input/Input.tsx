import { useField, Form, FormikProps, Formik } from 'formik'
import './Input.module.scss'

export const Input = (props: any) => {
  const [field, meta, helpers] = useField(props)
  const { type = 'text' } = props



  return (
    <div className="form-group">
      <label htmlFor={props.id}>{props.label}</label>
      <br />
      <input
        type={type}
        {...field}
        {...props}
        className={
          meta.error && meta.touched
            ? 'is-invalid form-control'
            : 'form-control'
        }
      />
      {meta.touched && meta.error ? <div>{meta.error.toString()}</div> : ''}
    </div>
  )
}
