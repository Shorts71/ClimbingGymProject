const Button = (props) => {
    const { text, onClick, children } = props;
    return (
        <button className="btn" onClick={onClick}>
            {children || text}
        </button>
    );
};

export default Button;