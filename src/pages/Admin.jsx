import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../cont/AuthContext";

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    fetchListings();
  }, []);

  // ================= FETCH LISTINGS =================
  const fetchListings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .order("id", { ascending: false });

      if (error) throw error;
      setListings(data || []);
    } catch (error) {
      console.error("Lỗi khi tải danh sách:", error.message);
      alert("Lỗi tải danh sách: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // ================= ACTIONS =================
  const handleOpenAdd = () => {
    setEditItem(null);
    setTitle("");
    setPrice("");
    setAddress("");
    setImageFile(null);
    setImagePreview("");
    setShowModal(true);
  };

  const handleOpenEdit = (item) => {
    setEditItem(item);
    setTitle(item.title);
    setPrice(item.price);
    setAddress(item.address);
    setImageFile(null);
    setImagePreview(item.image);
    setShowModal(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !price || !address) {
      alert("Vui lòng điền đầy đủ các thông tin bắt buộc!");
      return;
    }

    setSubmitting(true);
    try {
      let imageUrl = editItem ? editItem.image : "";
      let imageName = editItem ? editItem.image_name : "";

      // 1. Nếu có upload ảnh mới
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const newFileName = `${Date.now()}.${fileExt}`;

        // Upload ảnh mới
        const { error: uploadError } = await supabase.storage
          .from("listing-images")
          .upload(newFileName, imageFile);

        if (uploadError) throw uploadError;

        // Lấy public URL
        const { data: urlData } = supabase.storage
          .from("listing-images")
          .getPublicUrl(newFileName);

        imageUrl = urlData.publicUrl;

        // Xóa ảnh cũ trên storage (nếu có)
        if (editItem && editItem.image_name) {
          await supabase.storage
            .from("listing-images")
            .remove([editItem.image_name]);
        }

        imageName = newFileName;
      } else if (!editItem) {
        // Thêm mới bắt buộc phải chọn ảnh
        alert("Vui lòng chọn ảnh cho nhà đất mới!");
        setSubmitting(false);
        return;
      }

      // 2. Insert hoặc Update Database
      if (editItem) {
        // UPDATE
        const { error: updateError } = await supabase
          .from("listings")
          .update({
            title: title.trim(),
            price: Number(price),
            address: address.trim(),
            image: imageUrl,
            image_name: imageName,
          })
          .eq("id", editItem.id);

        if (updateError) throw updateError;
        alert("Cập nhật bất động sản thành công!");
      } else {
        // CREATE
        const { error: insertError } = await supabase.from("listings").insert([
          {
            title: title.trim(),
            price: Number(price),
            address: address.trim(),
            image: imageUrl,
            image_name: imageName,
          },
        ]);

        if (insertError) throw insertError;
        alert("Thêm bất động sản mới thành công!");
      }

      setShowModal(false);
      fetchListings();
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu:", error);
      alert("Lỗi: " + (error.message || "Không thể lưu bất động sản."));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa "${item.title}"?`)) return;

    try {
      // 1. Xóa trong Database
      const { error: deleteDbError } = await supabase
        .from("listings")
        .delete()
        .eq("id", item.id);

      if (deleteDbError) throw deleteDbError;

      // 2. Xóa hình ảnh trên Storage
      if (item.image_name) {
        const { error: deleteStorageError } = await supabase.storage
          .from("listing-images")
          .remove([item.image_name]);
        
        if (deleteStorageError) {
          console.warn("Lỗi khi xóa hình ảnh trên storage:", deleteStorageError.message);
        }
      }

      alert("Xóa bất động sản thành công!");
      fetchListings();
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
      alert("Lỗi khi xóa: " + error.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      {/* HEADER BAR */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo-Duane.jpg" alt="Logo" className="w-12 h-12 rounded-full object-cover border border-amber-500/50" />
            <div>
              <h1 className="text-xl font-bold tracking-wider font-serif text-white">DUANE SELLS</h1>
              <p className="text-xs text-amber-500 font-medium">REAL ESTATE ADMIN</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-400 hidden sm:inline">
              Đăng nhập dưới quyền: <strong className="text-slate-200">{user?.email}</strong>
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-slate-800 hover:border-red-500/30 hover:bg-red-500/10 text-slate-300 hover:text-red-400 rounded-lg text-sm transition-all duration-200 font-semibold"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </header>

      {/* DASHBOARD CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* SUBHEADER TITLE & ADD BUTTON */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-wide">Quản lý danh sách bất động sản</h2>
            <p className="text-sm text-slate-400 mt-1">Thêm, sửa, hoặc xóa các bất động sản hiển thị trên trang chủ.</p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 px-5 py-3 rounded-xl font-bold text-sm transition-all duration-200 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 active:scale-95"
          >
            <i className="ri-add-line text-lg"></i>
            Thêm nhà đất mới
          </button>
        </div>

        {/* LISTINGS TABLE/GRID */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
            <p className="text-sm text-slate-400 mt-4">Đang tải dữ liệu nhà đất...</p>
          </div>
        ) : listings.length === 0 ? (
          <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-12 text-center">
            <i className="ri-home-line text-5xl text-slate-600"></i>
            <h3 className="text-lg font-bold text-slate-300 mt-4">Chưa có bất động sản nào</h3>
            <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto">
              Danh sách trống. Hãy nhấp vào nút "Thêm nhà đất mới" ở phía trên để bắt đầu thêm các bất động sản đầu tiên.
            </p>
          </div>
        ) : (
          <div className="bg-slate-950/30 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                    <th className="py-4 px-6">Hình ảnh</th>
                    <th className="py-4 px-6">Tên bất động sản</th>
                    <th className="py-4 px-6">Giá</th>
                    <th className="py-4 px-6">Địa chỉ</th>
                    <th className="py-4 px-6 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {listings.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/20 transition-colors duration-150">
                      <td className="py-4 px-6">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-20 h-14 object-cover rounded-lg border border-slate-800"
                        />
                      </td>
                      <td className="py-4 px-6 font-semibold text-white text-sm max-w-xs truncate">
                        {item.title}
                      </td>
                      <td className="py-4 px-6 font-bold text-amber-500 text-sm">
                        ${item.price?.toLocaleString()}
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-400 max-w-xs truncate">
                        {item.address}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="inline-flex gap-2">
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="p-2 border border-slate-800 hover:border-amber-500/30 hover:bg-amber-500/10 text-slate-400 hover:text-amber-400 rounded-lg transition-all"
                            title="Sửa"
                          >
                            <i className="ri-pencil-line"></i>
                          </button>
                          <button
                            onClick={() => handleDelete(item)}
                            className="p-2 border border-slate-800 hover:border-red-500/30 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded-lg transition-all"
                            title="Xóa"
                          >
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* ADD/EDIT MODAL POPUP */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => !submitting && setShowModal(false)}></div>

          {/* Modal Box */}
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/40">
              <h3 className="text-lg font-bold text-white font-serif tracking-wider">
                {editItem ? "CẬP NHẬT BẤT ĐỘNG SẢN" : "THÊM BẤT ĐỘNG SẢN MỚI"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white"
                disabled={submitting}
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Title */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Tên nhà đất *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ví dụ: Luxury Villa on Oconee Lake"
                    className="bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl px-4 py-3 text-sm outline-none text-white transition-all"
                    required
                  />
                </div>

                {/* Price */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Giá bán ($) *</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Ví dụ: 1250000"
                    className="bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl px-4 py-3 text-sm outline-none text-white transition-all"
                    required
                  />
                </div>
              </div>

              {/* Address */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Địa chỉ *</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Ví dụ: 1041 Landing Dr, Greensboro, GA"
                  className="bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl px-4 py-3 text-sm outline-none text-white transition-all"
                  required
                />
              </div>

              {/* Image upload & preview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Hình ảnh {editItem ? "(Tùy chọn tải ảnh mới)" : "*"}
                  </label>
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-800 hover:border-slate-700 bg-slate-950 hover:bg-slate-950/60 rounded-xl p-4 cursor-pointer transition-all duration-200">
                    <i className="ri-image-add-line text-2xl text-slate-400"></i>
                    <span className="text-xs text-slate-400 mt-2 font-medium">Chọn một hình ảnh</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      required={!editItem}
                    />
                  </label>
                </div>

                {imagePreview && (
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-400">Xem trước ảnh:</label>
                    <div className="relative border border-slate-800 rounded-xl overflow-hidden h-24">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  </div>
                )}
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-3 border border-slate-800 hover:bg-slate-800 text-slate-300 rounded-xl text-sm font-semibold transition"
                  disabled={submitting}
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl text-sm font-bold transition shadow-lg shadow-amber-500/10 flex items-center gap-2"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-950"></div>
                      Đang xử lý...
                    </>
                  ) : editItem ? (
                    "Lưu thay đổi"
                  ) : (
                    "Thêm mới"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
