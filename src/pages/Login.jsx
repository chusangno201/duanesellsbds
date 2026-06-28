import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "../LoginAdmin.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setErrorMsg("Vui lòng điền đầy đủ email và mật khẩu.");
      setLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        // ĐĂNG KÝ ADMIN TÀI KHOẢN MẪU
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: trimmedEmail,
          password: trimmedPassword,
        });

        if (signUpError) throw signUpError;

        const newUser = signUpData.user;
        if (newUser) {
          // Thêm quyền admin vào bảng profiles
          const { error: profileError } = await supabase
            .from("profiles")
            .insert([{ id: newUser.id, role: "admin" }]);

          if (profileError) {
            console.error("Lỗi khi cập nhật profile role:", profileError);
            setErrorMsg("Đăng ký thành công nhưng không thể gán quyền Admin: " + profileError.message);
          } else {
            setSuccessMsg("Đăng ký tài khoản Admin thành công! Vui lòng đăng nhập.");
            setIsSignUp(false);
          }
        } else {
          setSuccessMsg("Vui lòng kiểm tra email để xác nhận đăng ký tài khoản!");
        }
      } else {
        // ĐĂNG NHẬP
        const { data, error } = await supabase.auth.signInWithPassword({
          email: trimmedEmail,
          password: trimmedPassword,
        });

        if (error) throw error;

        // Đăng nhập thành công -> check role
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", data.user.id)
          .single();

        if (profileError || !profile || profile.role !== "admin") {
          // Nếu không phải admin, đăng xuất ngay lập tức
          await supabase.auth.signOut();
          setErrorMsg("Tài khoản của bạn không có quyền truy cập Admin.");
        } else {
          navigate("/admin");
        }
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Đã xảy ra lỗi không xác định.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-admin-container">
      <div className="login-card">
        <div className="login-logo-section">
          <img src="/logo-Duane.jpg" alt="Duane Sells Logo" className="login-logo-img" />
          <h2 className="login-title">PORTAL ADMIN</h2>
          <p className="login-subtitle">
            {isSignUp ? "Tạo tài khoản quản trị thử nghiệm" : "Đăng nhập hệ thống quản lý bất động sản"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {errorMsg && <div className="login-alert error">{errorMsg}</div>}
          {successMsg && <div className="login-alert success">{successMsg}</div>}

          <div className="login-input-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
            />
          </div>

          <div className="login-input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="login-btn">
            {loading ? (
              <span className="spinner-loader"></span>
            ) : isSignUp ? (
              "Đăng ký tài khoản Admin"
            ) : (
              "Đăng Nhập"
            )}
          </button>
        </form>

        <div className="login-toggle-section">
          <button
            type="button"
            className="login-toggle-btn"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrorMsg("");
              setSuccessMsg("");
            }}
          >
            {isSignUp
              ? "Đã có tài khoản? Đăng nhập ngay"
              : "Chưa có tài khoản? Tạo tài khoản Admin mẫu"}
          </button>
        </div>
      </div>
    </div>
  );
}