import React from "react";

const Image = React.forwardRef((props, ref) => {
  const { text, preview, onChange, setPreview, setData, children, header } = props;

  const inputChange = (e) => {
    if (onChange) onChange(e, setPreview, setData);
  };

  return (
    <div className="image-frame my-3">
      <p>{header}</p>
      <div
        className="border-img m-auto my-2"
        style={{
          "--display": preview ? "none" : "block",
          "--content": `'${text}'`
        }}
      >
        <input
          type="file"
          className="input-image d-none"
          ref={ref}
          accept="image/*"
          onChange={inputChange}
        />
        <img
          className={`img-preview ${preview ? null : "d-none"}`}
          src={preview}
          alt={text}
        />
      </div>
      {children}
    </div>
  );
});

export default Image;
