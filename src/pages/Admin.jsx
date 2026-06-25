import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Admin() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [imageFile, setImageFile] = useState(null); // ✅ FIX
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchListings();
  }, []);

  // ================= FETCH =================
  const fetchListings = async () => {
    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .order("id", { ascending: false });

    if (!error) setListings(data);
  };

  // ================= ADD
  const addListing = async () => {
    try {
      if (!title || !price || !address || !imageFile) {
        alert("Vui lòng nhập đầy đủ thông tin + chọn hình");
        return;
      }

      setLoading(true);

      // ================= 1️⃣ Upload image =================
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("listing-images")
        .upload(fileName, imageFile);

      if (uploadError) {
        console.log("❌ UPLOAD ERROR:", uploadError);
        alert("Upload lỗi: " + uploadError.message);
        setLoading(false);
        return;
      }

      console.log("✅ Upload thành công:", uploadData);

      // ================= 2️⃣ Lấy public URL =================
      const { data } = supabase.storage
        .from("listing-images")
        .getPublicUrl(fileName);

      const publicUrl = data.publicUrl;

      if (!publicUrl) {
        alert("Không lấy được public URL");
        setLoading(false);
        return;
      }

      console.log("✅ Public URL:", publicUrl);

      // ================= 3️⃣ Insert vào database =================
      const { error: insertError } = await supabase.from("listings").insert([
        {
          title: title.trim(),
          price: Number(price),
          address: address.trim(),
          image: publicUrl,
        },
      ]);

      if (insertError) {
        console.log("❌ INSERT ERROR:", insertError);
        alert("Lỗi database: " + insertError.message);
        setLoading(false);
        return;
      }

      console.log("✅ Insert thành công");

      // ================= 4️⃣ Reset =================
      setTitle("");
      setPrice("");
      setAddress("");
      setImageFile(null);

      fetchListings();
    } catch (err) {
      console.log("❌ UNEXPECTED ERROR:", err);
      alert("Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE =================
  const deleteListing = async (id) => {
    await supabase.from("listings").delete().eq("id", id);
    fetchListings();
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#f8fafc,#eef2f7)",
        padding: "80px 20px",
      }}
    >
      {/* HEADER */}
      <h2
        style={{
          fontSize: "32px",
          fontWeight: "700",
          marginBottom: "50px",
          letterSpacing: "2px",
          textAlign: "center",
        }}
      >
        Duane Sells' - List of homes Luxury
      </h2>

      {/* LISTINGS */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {listings.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              gap: "30px",
              alignItems: "center",
              padding: "30px",
              background: "white",
              borderRadius: "22px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
              transition: "0.4s ease",
              overflow: "hidden",
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: "220px",
                height: "160px",
                objectFit: "cover",
                borderRadius: "18px",
                flexShrink: 0,
              }}
            />

            <div
              style={{
                flex: 1,
                minWidth: 0,
                wordBreak: "break-word",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: "22px",
                  fontWeight: 550,
                  lineHeight: "1.4",
                }}
              >
                {item.title}
              </h3>

              <div
                style={{
                  margin: "8px 0",
                  color: "#d4af37",
                  fontSize: "16px",
                  letterSpacing: "3px",
                }}
              >
                ★★★★★
              </div>

              <p
                style={{
                  margin: "10px 0",
                  fontSize: "24px",
                  fontWeight: 800,
                  color: "#bfa14a",
                }}
              >
                ${item.price?.toLocaleString()}
              </p>

              <p
                style={{
                  margin: 0,
                  color: "#6b7280",
                  fontSize: "14px",
                }}
              >
                {item.address}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
