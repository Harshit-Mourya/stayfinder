import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const resultAction = await dispatch(registerUser(formData));

      if (registerUser.fulfilled.match(resultAction)) {
        toast.success("Registration successful!");
        navigate("/dashboard");
      } else {
        const msg = resultAction.payload || "Registration failed.";
        toast.error(msg);
        setError(msg);
      }
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.");
      setError("Something went wrong: ", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Register on StayFinder
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            disabled={isSubmitting}
            name="name"
            placeholder="Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            disabled={isSubmitting}
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            disabled={isSubmitting}
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex items-center gap-4">
            <label className="font-medium text-gray-700 whitespace-nowrap">
              Select Role:
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                disabled={isSubmitting}
                name="role"
                value="user"
                checked={formData.role === "user"}
                onChange={handleChange}
                required
              />
              User
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                disabled={isSubmitting}
                name="role"
                value="host"
                checked={formData.role === "host"}
                onChange={handleChange}
              />
              Host
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>

          {error && (
            <p className="text-red-600 text-sm text-center mt-2">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
