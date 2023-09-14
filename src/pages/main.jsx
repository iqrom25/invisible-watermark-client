import React from "react";
import Button from "../components/button";
import Image from "../components/image";
import Loading from "../components/loading";
import Frame from "../components/frame";
import { useMutation } from "@tanstack/react-query";
import { postWatermarkedImage } from "../services/watermarkAPi";
import Swal from "sweetalert2";

const Main = () => {
  const hostRef = React.createRef();
  const watermarkRef = React.createRef();
  const [host, setHost] = React.useState(null);
  const [watermark, setWatermark] = React.useState(null);
  const [result, setResult] = React.useState(null);
  const [hostPreview, setHostPreview] = React.useState(null);
  const [watermarkPreview, setWatermarkPreview] = React.useState(null);
  // const [resultPreview, setResultPreview] = React.useState(null);
  const mutation = useMutation(postWatermarkedImage, {
    onSuccess: (result) => {
      const data = result.data.data;
      setResult(data);
    },
    onError: (error) => {
      const response = error.response.data;
      setTimeout(() => {
        Swal.fire({
          icon: "error",
          title: `Error : ${response.code}`,
          text: response.message
        });
      }, 1000);
    }
  });

  const handleSelectImage = (ref) => {
    ref.current.click();
  };

  const handleInputChange = (e, setPreview, setData) => {
    const file = e.target.files?.[0];

    if (!file) {
      setPreview(null);
      setData(null);
      return;
    }

    const url = URL.createObjectURL(file);

    setData(file);
    setPreview(url);
  };

  const handleEmbeded = () => {
    const form = new FormData();
    form.append("Host", host);
    form.append("Watermark", watermark);
    form.append("Value", 1);
    mutation.mutate(form);
  };

  if (mutation.isLoading) return <Loading />;

  return (
    <div className="container">
      <div className="row my-4">
        <div className="col-6 text-center">
          <Frame header="Inisialisasi">
            <Image
              header="Citra Host"
              text="Host image"
              preview={hostPreview}
              ref={hostRef}
              onChange={handleInputChange}
              setPreview={setHostPreview}
              setData={setHost}
            >
              <Button onClick={handleSelectImage} ref={hostRef}>
                Pilih Gambar
              </Button>
            </Image>
            <Image
              header="Citra Watermark"
              text="Watermark image"
              preview={watermarkPreview}
              ref={watermarkRef}
              onChange={handleInputChange}
              setPreview={setWatermarkPreview}
              setData={setWatermark}
            >
              <Button onClick={handleSelectImage} ref={watermarkRef}>
                Pilih Gambar
              </Button>
            </Image>
          </Frame>
        </div>
        <div className="col-6 text-center">
          <Frame header="DWT Proses">
            <Image
              header="Citra Host"
              text="Host image"
              preview={result ? `data:image/png;base64,${result?.hostDwt}` : ""}
            />
            <Image
              header="Citra Watermark"
              text="Watermark image"
              preview={
                result ? `data:image/png;base64,${result?.watermarkDwt}` : ""
              }
            />
            <Button onClick={handleEmbeded}>Penyisipan</Button>
          </Frame>
        </div>
        <div className="col-6 text-center">
          <Frame header="Hasil Penyisipan">
            <Image
              header="Citra Berwatermark"
              text="Watermarked image"
              preview={
                result
                  ? `data:image/png;base64,${result?.watermarkedImage}`
                  : ""
              }
            >
              <Button onClick={handleEmbeded}>Simpan Gambar</Button>
            </Image>
          </Frame>
        </div>
        <div className="col-6 text-center">
          <Frame header="Perbandingan">
            <Image
              header="Citra Host"
              text="Host image"
              preview={result ? hostPreview : ''}
            />
            <Image
              header="Citra Berwatermark"
              text="watermark image"
              preview={
                result
                  ? `data:image/png;base64,${result?.watermarkedImage}`
                  : ""
              }
            />
            <div className="row my-3">
              <label className="col-sm-5 col-form-label">Nilai PSNR</label>
              <div className="col-sm-3">
                <input
                  type="text"
                  className="form-control"
                  value={result?.psnr}
                  disabled
                />
              </div>
            </div>
          </Frame>
        </div>
        {/* <div className="col-4 text-center">
            <Image
              text="watermark image"
              preview={watermarkPreview}
              ref={watermarkRef}
              onChange={handleInputChange}
              setPreview={setWatermarkPreview}
              setData={setWatermark}
            />
            <Button onClick={handleSelectImage} ref={watermarkRef}>
              Pilih Gambar
            </Button>
          </div>
          <div className="col-4 text-center">
            <Image
              text="watermarked image"
              preview={
                result
                  ? `data:image/png;base64,${result?.watermarkedImage}`
                  : ""
              }
            />
            <Button onClick={handleEmbeded}>Embeded</Button>
            <div className="row my-3">
              <label className="col-sm-4 col-form-label">Nilai PSNR</label>
              <div className="col-sm-6">
                <input
                  type="email"
                  className="form-control"
                  value={result?.psnr}
                  disabled
                />
              </div>
            </div>
          </div> */}
      </div>
    </div>
  );
};

export default Main;
