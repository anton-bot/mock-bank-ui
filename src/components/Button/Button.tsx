import './Button.scss';

type Props = {
  onClick: () => void;
  disabled?: boolean;
};

export const Button: React.FC<Props> = (props) => {
  return (
    <button className="Button" type="button" onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </button>
  );
};
