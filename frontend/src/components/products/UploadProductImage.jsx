import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../shared/button";
import useApi from "../shared/API";

function UploadImage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const { loading, data, error, refetch } = useApi(
    `${import.meta.env.VITE_API_URL}/upload-image`,
    { method: "POST" },
    { auto: false }
  );

  useEffect(() => {
    if (!id) navigate("/products");
  }, []);

  useEffect(() => {
    if (!data?.product) return;
    alert(
      `Image succesfully uploaded!`
    );
    navigate("/products");
  }, [data]);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    console.log(id);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("id", id);
    refetch(formData);
  };

  return (
    <div className="form-container">
      <h1>Upload Product Image</h1>

      <form className="form" onSubmit={handleSubmit}>
        {error && (
          <div className="error" style={{ marginBottom: "20px" }}>
            {error}
          </div>
        )}

        <label htmlFor="image">Select Image</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleChange}
          disabled={loading}
          required
        />

        {preview && (
          <div style={{ marginTop: "20px" }}>
            <p>Image Preview:</p>
            <img
              src={preview}
              alt="Preview"
              style={{ width: "200px", objectFit: "cover" }}
            />
          </div>
        )}

        <Button disabled={file === null || loading} type="submit">
          {loading ? "Uploading..." : "Upload Image"}
        </Button>
      </form>
    </div>
  );
}

export default UploadImage;
