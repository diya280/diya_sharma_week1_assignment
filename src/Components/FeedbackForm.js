import React, { useState } from "react";
import "./FeedbackForm.css";

const FeedbackForm = () => {
  // State for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState("");
  const [comments, setComments] = useState("");
  const [submittedData, setSubmittedData] = useState(null);
  const [errors, setErrors] = useState({});

  // Basic validation for form fields
  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.com$/.test(email)) newErrors.email = "Invalid email format (must end with .com)";
    if (!rating) newErrors.rating = "Rating is required";
    if (!comments) newErrors.comments = "Comments are required";
    return newErrors;
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmittedData({ name, email, rating, comments });
    setErrors({});
    // Clear the form
    setName("");
    setEmail("");
    setRating("");
    setComments("");
  };

  return (
    <div className="form-container">
      <h1>Customer Feedback Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label>Rating (1-5):</label>
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="">Select Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          {errors.rating && <p className="error">{errors.rating}</p>}
        </div>

        <div className="form-group">
          <label>Comments:</label>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          ></textarea>
          {errors.comments && <p className="error">{errors.comments}</p>}
        </div>

        <button type="submit">Submit Feedback</button>
      </form>

      {/* Display submitted data */}
      {submittedData && (
        <div className="submitted-data">
          <h2>Submitted Feedback:</h2>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Rating:</strong> {submittedData.rating}</p>
          <p><strong>Comments:</strong> {submittedData.comments}</p>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
