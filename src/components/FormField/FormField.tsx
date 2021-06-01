import './FormField.scss';

type Props = {
  label: string;
  error: string | undefined;
  touched: boolean;
};

export const FormField: React.FC<Props> = (props) => {
  return (
    <div className="FormField">
      <div className="label">{props.label}</div>
      <div className="control">{props.children}</div>
      {props.touched && props.error && <div className="error">{props.error}</div>}
    </div>
  );
};
