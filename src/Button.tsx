type ButtonPropsType = {
  title: string
  onClickHandler?: () => void
  disabled?: boolean
  classes?: string
};

export const Button = (props: ButtonPropsType) => {
  return (
    <button className={props.classes}
            disabled={props.disabled} 
            onClick={props.onClickHandler}>{props.title}</button>
  );
};