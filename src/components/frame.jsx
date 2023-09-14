const Frame = (props) => {
  const { header, children } = props;

  return (
    <div
      className="outer-frame"
      style={{
        "--content": `'${header}'`
      }}
    >
      <div className="frame card shadow my-4">{children}</div>
    </div>
  );
};

export default Frame;
