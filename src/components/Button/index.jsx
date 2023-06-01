import "./index.css";

function Button(props) {
  return (
    <button className={`
      btn
      ${props.operation ? "operation" : ""}
      ${props.equal ? "equal" : ""}
      `}
      onClick={() => props.click(props.label)}
    >{props.label}</button>
  );
}

export default Button;
