import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function Admin() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);

  const inputStyle = {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    width: "100%",
  };

  // =============================
  // FETCH LISTINGS
  // =============================
  const fetchListings = async () => {
    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .order("id", { ascending: false });

    if (!error) {
      setListings(data);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  // =============================
  const addListing = async () => {
    if (!title || !price || !address || !imageFile) {
      alert("Vui lòng nhập đầy đủ thông tin + chọn hình");
      return;
    }

    setLoading(true);

    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    // Upload ảnh
    const { error: uploadError } = await supabase.storage
      .from("listing-images")
      .upload(fileName, imageFile);

    if (uploadError) {
      alert(uploadError.message);
      setLoading(false);
      return;
    }

    const { data } = supabase.storage
      .from("listing-images")
      .getPublicUrl(fileName);

    const publicUrl = data.publicUrl;

    // Insert DB
    const { error: insertError } = await supabase
      .from("listings")
      .insert([
        {
          title,
          price: Number(price),
          address,
          image: publicUrl,
          image_name: fileName,
        },
      ]);

    if (insertError) {
      alert(insertError.message);
      setLoading(false);
      return;
    }

    setTitle("");
    setPrice("");
    setAddress("");
    setImageFile(null);
    setLoading(false);

    fetchListings(); // reload
  };

  // =============================
  // DELETE LISTING
  // =============================
  const deleteListing = async (id, image_name) => {
    await supabase.from("listings").delete().eq("id", id);

    if (image_name) {
      await supabase.storage
        .from("listing-images")
        .remove([image_name]);
    }

    fetchListings();
  };

  return (
    <div style={{ maxWidth: "900px", margin: "100px auto" }}>
      <h2>Admin - Upload Listing</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "15px",
          marginBottom: "25px",
        }}
      >
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={inputStyle}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
      </div>

      <button
        onClick={addListing}
        disabled={loading}
        style={{
          padding: "12px 25px",
          background: "#111",
          color: "white",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
        }}
      >
        {loading ? "Uploading..." : "Add Listing"}
      </button>

      {/* LIST */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "40px",
        }}
      >
        {listings.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
              padding: "20px",
              background: "#f3f4f6",
              borderRadius: "12px",
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: "120px",
                height: "90px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />

            <div style={{ flex: 1 }}>
              <h4 style={{ margin: 0 }}>{item.title}</h4>
              <p style={{ margin: "5px 0" }}>
                ${item.price?.toLocaleString()}
              </p>
              <small>{item.address}</small>
            </div>

            <button
              onClick={() =>
                deleteListing(item.id, item.image_name)
              }
              style={{
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "8px 14px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}