import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../cont/AuthContext";

const BUCKET_NAME = "listing-images";
const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Form fields
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [originalImages, setOriginalImages] = useState([]);

  const [toast, setToast] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const showToast = (message, type = "success") => {
    setToast({ show: true, type, message });

    window.setTimeout(() => {
      setToast({ show: false, type: "success", message: "" });
    }, 2600);
  };

  const getListingImages = (item) => {
    if (!item) return [];

    if (Array.isArray(item.images) && item.images.length > 0) {
      return item.images.filter((img) => img?.url);
    }

    // Fallback cho dữ liệu cũ chỉ có 1 ảnh
    if (item.image) {
      return [
        {
          url: item.image,
          name: item.image_name || "",
        },
      ];
    }

    return [];
  };

  const resetForm = () => {
    imagePreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
    setEditItem(null);
    setTitle("");
    setPrice("");
    setAddress("");
    setImageFiles([]);
    setImagePreviews([]);
    setExistingImages([]);
    setOriginalImages([]);
  };

  useEffect(() => {
    fetchListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      showToast("Lỗi tải danh sách: " + error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    resetForm();
    setShowModal(true);
  };

  const handleOpenEdit = (item) => {
    imagePreviews.forEach((preview) => URL.revokeObjectURL(preview.url));

    const images = getListingImages(item);

    setEditItem(item);
    setTitle(item.title || "");
    setPrice(item.price || "");
    setAddress(item.address || "");
    setImageFiles([]);
    setImagePreviews([]);
    setExistingImages(images);
    setOriginalImages(images);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    if (submitting) return;
    resetForm();
    setShowModal(false);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const validFiles = [];
    const previews = [];

    files.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        showToast(`${file.name} không phải là hình ảnh.`, "error");
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        showToast(`${file.name} vượt quá 8MB.`, "error");
        return;
      }

      validFiles.push(file);
      previews.push({
        url: URL.createObjectURL(file),
        name: file.name,
      });
    });

    setImageFiles((prev) => [...prev, ...validFiles]);
    setImagePreviews((prev) => [...prev, ...previews]);

    // Cho phép chọn lại cùng file nếu cần
    e.target.value = "";
  };

  const removeNewImage = (index) => {
    setImagePreviews((prev) => {
      const removeItem = prev[index];
      if (removeItem?.url) URL.revokeObjectURL(removeItem.url);
      return prev.filter((_, i) => i !== index);
    });

    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadSelectedImages = async () => {
    if (!imageFiles.length) return [];

    const uploadedImages = [];

    for (const [index, file] of imageFiles.entries()) {
      const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const safeFileName = `${user?.id || "admin"}/${Date.now()}-${index}-${Math.random()
        .toString(36)
        .slice(2)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(safeFileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(safeFileName);

      uploadedImages.push({
        url: urlData.publicUrl,
        name: safeFileName,
      });
    }

    return uploadedImages;
  };

  const removeImagesFromStorage = async (images = []) => {
    const names = images.map((img) => img?.name).filter(Boolean);
    if (!names.length) return;

    const { error } = await supabase.storage.from(BUCKET_NAME).remove(names);
    if (error) {
      console.warn("Lỗi khi xóa hình ảnh trên storage:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      showToast("Bạn cần đăng nhập để thêm bất động sản.", "error");
      navigate("/login");
      return;
    }

    if (!title.trim() || !price || !address.trim()) {
      showToast("Vui lòng điền đầy đủ thông tin bắt buộc.", "error");
      return;
    }

    if (Number(price) <= 0) {
      showToast("Giá bán phải lớn hơn 0.", "error");
      return;
    }

    if (!editItem && imageFiles.length === 0) {
      showToast("Vui lòng chọn ít nhất 1 hình ảnh cho nhà đất mới.", "error");
      return;
    }

    setSubmitting(true);

    try {
      const uploadedImages = await uploadSelectedImages();
      const finalImages = [...existingImages, ...uploadedImages];

      if (finalImages.length === 0) {
        showToast("Bất động sản cần ít nhất 1 hình ảnh.", "error");
        setSubmitting(false);
        return;
      }

      const coverImage = finalImages[0];

      const payload = {
        title: title.trim(),
        price: Number(price),
        address: address.trim(),
        image: coverImage.url,
        image_name: coverImage.name,
        images: finalImages,
      };

      if (editItem) {
        const { error: updateError } = await supabase
          .from("listings")
          .update(payload)
          .eq("id", editItem.id);

        if (updateError) throw updateError;

        const finalNames = new Set(finalImages.map((img) => img.name));
        const removedImages = originalImages.filter(
          (img) => img?.name && !finalNames.has(img.name)
        );
        await removeImagesFromStorage(removedImages);

        showToast("Cập nhật bất động sản thành công!");
      } else {
        const { error: insertError } = await supabase
          .from("listings")
          .insert([payload]);

        if (insertError) throw insertError;
        showToast("Thêm bất động sản mới thành công!");
      }

      resetForm();
      setShowModal(false);
      fetchListings();
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu:", error);
      showToast(error.message || "Không thể lưu bất động sản.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;

    try {
      const images = getListingImages(confirmDelete);

      const { error: deleteDbError } = await supabase
        .from("listings")
        .delete()
        .eq("id", confirmDelete.id);

      if (deleteDbError) throw deleteDbError;

      await removeImagesFromStorage(images);

      showToast("Xóa bất động sản thành công!");
      setConfirmDelete(null);
      fetchListings();
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
      showToast("Lỗi khi xóa: " + error.message, "error");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* TOAST */}
      {toast.show && (
        <div className="fixed right-6 top-6 z-[9999] animate-toast-in">
          <div
            className={`min-w-[320px] max-w-md rounded-2xl border p-4 shadow-2xl backdrop-blur-xl ${
              toast.type === "success"
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 shadow-emerald-500/10"
                : "border-red-500/30 bg-red-500/10 text-red-300 shadow-red-500/10"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  toast.type === "success"
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "bg-red-500/20 text-red-300"
                }`}
              >
                <i
                  className={`text-xl ${
                    toast.type === "success"
                      ? "ri-check-line"
                      : "ri-error-warning-line"
                  }`}
                />
              </div>

              <div className="flex-1">
                <h4 className="text-sm font-bold text-white">
                  {toast.type === "success" ? "Success" : "Error"}
                </h4>
                <p className="mt-1 text-sm leading-relaxed opacity-90">
                  {toast.message}
                </p>
              </div>

              <button
                onClick={() =>
                  setToast({ show: false, type: "success", message: "" })
                }
                className="text-slate-400 transition hover:text-white"
                type="button"
              >
                <i className="ri-close-line text-xl" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div
            onClick={() => navigate("/")}
            className="flex cursor-pointer select-none items-center gap-4"
            role="button"
            title="Về trang chủ"
          >
            <img
              src="/logo-Duane.jpg"
              alt="Logo"
              className="h-12 w-12 rounded-full border border-amber-500/50 object-cover transition hover:scale-105"
            />

            <div>
              <h1 className="font-serif text-xl font-bold tracking-wider text-white transition hover:text-amber-400">
                DUANE SELLS
              </h1>
              <p className="text-xs font-medium tracking-[0.2em] text-amber-500">
                REAL ESTATE ADMIN
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden text-xs text-slate-400 sm:inline">
              Logged in: <strong className="text-slate-200">{user?.email}</strong>
            </span>
            <button
              onClick={handleLogout}
              className="rounded-lg border border-slate-800 px-4 py-2 text-sm font-semibold text-slate-300 transition-all duration-200 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
              type="button"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.35em] text-amber-500">
              Dashboard
            </p>
            <h2 className="font-serif text-3xl font-bold tracking-wide text-white">
              Property Management
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Add, edit, delete, and manage property photo galleries.
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/10 transition-all duration-200 hover:from-amber-400 hover:to-orange-400 hover:shadow-amber-500/20 active:scale-95"
            type="button"
          >
            <i className="ri-add-line text-lg" />
            Add new property
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-amber-500" />
            <p className="mt-4 text-sm text-slate-400">Loading properties...</p>
          </div>
        ) : listings.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-12 text-center">
            <i className="ri-home-line text-5xl text-slate-600" />
            <h3 className="mt-4 text-lg font-bold text-slate-300">
              No properties yet
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
              Click “Add new property” to create your first property listing.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/30 shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/60 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    <th className="px-6 py-4">Images</th>
                    <th className="px-6 py-4">Property name</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Address</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-800/60">
                  {listings.map((item) => {
                    const images = getListingImages(item);

                    return (
                      <tr
                        key={item.id}
                        className="transition-colors duration-150 hover:bg-slate-800/20"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <img
                              src={images[0]?.url || item.image}
                              alt={item.title}
                              className="h-14 w-20 rounded-lg border border-slate-800 object-cover"
                            />
                            {images.length > 1 && (
                              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-1 text-xs font-bold text-amber-400">
                                +{images.length - 1}
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="max-w-xs truncate px-6 py-4 text-sm font-semibold text-white">
                          {item.title}
                        </td>

                        <td className="px-6 py-4 text-sm font-bold text-amber-500">
                          ${Number(item.price || 0).toLocaleString()}
                        </td>

                        <td className="max-w-xs truncate px-6 py-4 text-sm text-slate-400">
                          {item.address}
                        </td>

                        <td className="px-6 py-4 text-right">
                          <div className="inline-flex gap-2">
                            <button
                              onClick={() => handleOpenEdit(item)}
                              className="rounded-lg border border-slate-800 p-2 text-slate-400 transition-all hover:border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-400"
                              title="Edit"
                              type="button"
                            >
                              <i className="ri-pencil-line" />
                            </button>
                            <button
                              onClick={() => setConfirmDelete(item)}
                              className="rounded-lg border border-slate-800 p-2 text-slate-400 transition-all hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
                              title="Delete"
                              type="button"
                            >
                              <i className="ri-delete-bin-line" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={handleCloseModal}
            type="button"
            aria-label="Close modal"
          />

          <div className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-slate-700/80 bg-slate-900 shadow-2xl animate-modal-in">
            <div className="border-b border-slate-700/70 bg-slate-950/30 px-6 py-6 sm:px-10">
              <button
                onClick={handleCloseModal}
                className="absolute right-6 top-6 text-slate-400 transition hover:text-white"
                disabled={submitting}
                type="button"
              >
                <i className="ri-close-line text-3xl" />
              </button>

              <p className="mb-3 text-xs font-bold uppercase tracking-[0.5em] text-amber-500">
                {editItem ? "Update" : "Create"}
              </p>
              <h3 className="font-serif text-3xl font-bold uppercase tracking-wider text-white">
                {editItem ? "Update property" : "Add new property"}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 p-6 sm:p-10">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div className="flex flex-col gap-3">
                  <label className="text-sm font-bold uppercase tracking-wider text-slate-300">
                    Property name *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Luxury Villa on Oconee Lake"
                    className="rounded-2xl border border-slate-700 bg-slate-950 px-5 py-4 text-base font-semibold text-white outline-none transition-all placeholder:text-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    required
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-sm font-bold uppercase tracking-wider text-slate-300">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="1250000"
                    className="rounded-2xl border border-slate-700 bg-slate-950 px-5 py-4 text-base font-semibold text-white outline-none transition-all placeholder:text-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-sm font-bold uppercase tracking-wider text-slate-300">
                  Address *
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="1041 Landing Dr, Greensboro, GA"
                  className="rounded-2xl border border-slate-700 bg-slate-950 px-5 py-4 text-base font-semibold text-white outline-none transition-all placeholder:text-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="flex flex-col gap-3">
                  <label className="text-sm font-bold uppercase tracking-wider text-slate-300">
                    Images {editItem ? "" : "*"}
                  </label>

                  <label className="flex min-h-[170px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-700 bg-slate-950 p-6 text-center transition-all duration-200 hover:border-amber-500/50 hover:bg-slate-950/70">
                    <i className="ri-image-add-line text-5xl text-slate-500" />
                    <span className="mt-4 text-sm font-semibold text-slate-300">
                      Choose many images
                    </span>
                    <span className="mt-2 text-xs text-slate-500">
                      PNG, JPG, WEBP. Maximum 8MB / image.
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>

                  <p className="text-xs leading-relaxed text-slate-500">
                    The first image will be used as the cover image on the home page.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-sm font-bold text-slate-400">
                    Preview images:
                  </label>

                  {existingImages.length === 0 && imagePreviews.length === 0 ? (
                    <div className="flex min-h-[170px] items-center justify-center rounded-2xl border border-slate-800 bg-slate-950/60 text-sm text-slate-500">
                      No images selected.
                    </div>
                  ) : (
                    <div className="grid max-h-[360px] grid-cols-2 gap-3 overflow-y-auto pr-1 sm:grid-cols-3">
                      {existingImages.map((img, index) => (
                        <div
                          key={`${img.url}-${index}`}
                          className="group relative overflow-hidden rounded-xl border border-slate-700 bg-slate-950"
                        >
                          <img
                            src={img.url}
                            alt={`Property ${index + 1}`}
                            className="h-28 w-full object-cover transition group-hover:scale-105"
                          />
                          <button
                            type="button"
                            onClick={() => removeExistingImage(index)}
                            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500/90 text-white opacity-0 shadow-lg transition hover:bg-red-400 group-hover:opacity-100"
                            title="Remove image"
                          >
                            <i className="ri-close-line text-lg" />
                          </button>
                          {index === 0 && (
                            <span className="absolute bottom-2 left-2 rounded-full bg-amber-500 px-2 py-1 text-[10px] font-bold uppercase text-slate-950">
                              Cover
                            </span>
                          )}
                        </div>
                      ))}

                      {imagePreviews.map((preview, index) => {
                        const realIndex = existingImages.length + index;

                        return (
                          <div
                            key={`${preview.url}-${index}`}
                            className="group relative overflow-hidden rounded-xl border border-amber-500/30 bg-slate-950"
                          >
                            <img
                              src={preview.url}
                              alt={preview.name}
                              className="h-28 w-full object-cover transition group-hover:scale-105"
                            />
                            <button
                              type="button"
                              onClick={() => removeNewImage(index)}
                              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500/90 text-white opacity-0 shadow-lg transition hover:bg-red-400 group-hover:opacity-100"
                              title="Remove image"
                            >
                              <i className="ri-close-line text-lg" />
                            </button>
                            {realIndex === 0 && (
                              <span className="absolute bottom-2 left-2 rounded-full bg-amber-500 px-2 py-1 text-[10px] font-bold uppercase text-slate-950">
                                Cover
                              </span>
                            )}
                            <span className="absolute left-2 top-2 rounded-full bg-emerald-500/90 px-2 py-1 text-[10px] font-bold uppercase text-white">
                              New
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-4 border-t border-slate-700/70 pt-8">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="rounded-2xl border border-slate-700 px-8 py-4 text-sm font-bold text-slate-300 transition hover:bg-slate-800"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-9 py-4 text-sm font-black text-slate-950 shadow-lg shadow-amber-500/10 transition hover:from-amber-400 hover:to-orange-400 disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-slate-950" />
                      Processing...
                    </>
                  ) : editItem ? (
                    "Save changes"
                  ) : (
                    "Add new"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM MODAL */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setConfirmDelete(null)}
            type="button"
            aria-label="Close delete modal"
          />

          <div className="relative w-full max-w-md rounded-2xl border border-red-500/20 bg-slate-900 p-6 shadow-2xl animate-modal-in">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-red-400">
              <i className="ri-delete-bin-line text-3xl" />
            </div>

            <h3 className="text-xl font-bold text-white">Delete property?</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Are you sure you want to delete “{confirmDelete.title}”? This will
              also remove all property images from storage.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-bold text-slate-300 transition hover:bg-slate-800"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="rounded-xl bg-red-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-400"
                type="button"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
