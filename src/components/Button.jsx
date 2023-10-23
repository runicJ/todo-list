import "../App.css";

export const Button = (props) => {
  return <button className={`${props.className} button`} {...props} />;
};
