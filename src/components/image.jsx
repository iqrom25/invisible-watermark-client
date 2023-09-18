import React from "react";
import { CustomContext } from "../context/customContext";

const Image = React.forwardRef((props, ref) => {
  const { text, preview, onChange, setPreview, setData, children, showInfo } =
    props;
  const { setSize, setDimension, dimension, size } =
    React.useContext(CustomContext);
  const [fileSize, setFileSize] = React.useState();
  const [fileDimension, setFileDimension] = React.useState();

  const inputChange = (e) => {
    if (onChange) {
      const file = e.target.files?.[0];
      if (!file) {
        return;
      }
      const imgSize = Math.round(file?.size / 1024);

      switch (text) {
        case "Citra Host":
          setSize({ ...size, host: imgSize });
          break;
        case "Citra Watermark":
          setSize({ ...size, watermark: imgSize });
          break;
        default:
          break;
      }

      const image = new window.Image();
      image.src = URL.createObjectURL(file);
      image.onload = async () => {
        switch (text) {
          case "Citra Host":
            setDimension({
              ...dimension,
              host: {
                width: image.width,
                height: image.height
              }
            });
            break;
          case "Citra Watermark":
            setDimension({
              ...dimension,
              watermark: {
                width: image.width,
                height: image.height
              }
            });
            break;
          default:
            break;
        }
      };

      onChange(e, setPreview, setData);
    }
  };

  React.useEffect(() => {
    switch (text) {
      case "Citra Host":
        setFileSize(size?.host);
        setFileDimension(dimension?.host);
        break;
      case "Citra Watermark":
        setFileSize(size?.watermark);
        setFileDimension(dimension?.watermark);
        break;
      case "Citra Berwatermark":
        const base64String = preview.substring(preview.indexOf(",") + 1);
        setFileSize(Math.ceil((base64String.length * 6) / 8 / 1000));

        const image = new window.Image();
        image.src = preview;
        image.onload = async () => {
          setDimension({
            ...dimension,
            watermarked: {
              width: image.width,
              height: image.height
            }
          });
        };

        setFileDimension(dimension?.watermarked);
        break;
      default:
        break;
    }
  }, [
    dimension,
    dimension?.host,
    dimension?.watermark,
    dimension?.watermarked,
    preview,
    setDimension,
    size?.host,
    size?.watermark,
    size?.watermarked,
    text
  ]);

  return (
    <div className="image-frame my-3">
      <p>{text}</p>
      <div className="border-img m-auto my-2">
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
      { showInfo && preview && (
        <div className="img-info">
          <p>Ukuran : {fileSize} KB</p>
          <p>
            Dimensi : {fileDimension?.width}px X {fileDimension?.height}px
          </p>
        </div>
      )}

      {children}
    </div>
  );
});

export default Image;
