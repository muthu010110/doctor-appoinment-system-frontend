import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Stylefile/Appoinment.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function BookAppointment() {
  const navigate = useNavigate();

  // --- helpers
  const toDateInput = (d) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;

  const toTimeInput = (d) =>
    `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;

  // round up to next hour (e.g., 13:15 -> 14:00)
  const nextWholeHour = (date = new Date()) => {
    const d = new Date(date);
    d.setMinutes(0, 0, 0);
    d.setHours(d.getHours() + 1);
    return d;
    };

  const today = new Date();

  // --- state
  const [formdata, setformdata] = useState({
    name: "",
    doctorId: "",
    date: toDateInput(today),
    time: toTimeInput(nextWholeHour(today)),
    note: "",
  });

  const [doctors, setDoctors] = useState([]);
  const [timeMin, setTimeMin] = useState(toTimeInput(nextWholeHour(today))); // dynamic min for time input
  const dateMin = toDateInput(today); // static min for date

  // --- load doctors
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/doctor");
        setDoctors(res.data || []);
      } catch (err) {
        console.error("Error loading doctors:", err);
        toast.error("Failed to load doctors");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- adjust time min when date changes
  useEffect(() => {
    // if selected date is today, min time is now + 1h; else reset to 00:00
    const selected = new Date(formdata.date + "T00:00:00");
    const isToday =
      selected.getFullYear() === today.getFullYear() &&
      selected.getMonth() === today.getMonth() &&
      selected.getDate() === today.getDate();

    if (isToday) {
      const nh = nextWholeHour(new Date());
      setTimeMin(toTimeInput(nh));

      // if currently selected time is before the new min, bump it up
      const [h, m] = formdata.time.split(":").map(Number);
      const cur = new Date();
      cur.setHours(h, m, 0, 0);
      if (cur < nh) {
        setformdata((p) => ({ ...p, time: toTimeInput(nh) }));
      }
    } else {
      setTimeMin("00:00");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formdata.date]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ---- session check (sessionStorage, not localStorage)
    const raw = sessionStorage.getItem("auth");
    if (!raw) {
      toast.error("Please login to book an appointment!");
      setTimeout(() => navigate("/login"), 900);
      return;
    }
    const auth = JSON.parse(raw);
    const email = auth?.email;
    if (!email) {
      toast.error("Login session invalid. Please login again.");
      sessionStorage.clear();
      setTimeout(() => navigate("/login"), 900);
      return;
    }

    // payload aligned to backend
    const payload = {
      ...formdata,
      email, // from session
    };

    try {
      const response = await axios.post("http://localhost:8080/api/appointment", payload);
      if (response.status === 200 || response.status === 201) {
        toast.success("Appointment booked successfully! Check your email for confirmation.");
        setformdata({
          name: "",
          doctorId: "",
          date: toDateInput(new Date()),
          time: toTimeInput(nextWholeHour(new Date())),
          note: "",
        });
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error(error?.response?.data?.message || "Failed to book appointment!");
    }
  };

  return (
    <div id="appoinment" className="appointment-container">
     <ToastContainer
  position="top-center"
  autoClose={2200}
  hideProgressBar={false}
  newestOnTop
  closeOnClick
  pauseOnHover
  draggable
/>

      <div className="appointment-card">
        <h2>Book Your Appointment</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formdata.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Select Doctor</label>
            <select
              name="doctorId"
              value={formdata.doctorId}
              onChange={handleChange}
              required
            >
              <option value="">Choose doctor</option>
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.name} — ({doc.specialization})
                </option>
              ))}
            </select>
          </div>

          <div className="row">
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                min={dateMin}                    // ✅ cannot pick past dates
                value={formdata.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Time</label>
              <input
                type="time"
                name="time"
                min={timeMin}                    // ✅ today → now+1h, else 00:00
                value={formdata.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              name="note"
              placeholder="Enter any additional information"
              value={formdata.note}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="book-btn">Book Appointment</button>
        </form>
      </div>
    </div>
  );
}

export default BookAppointment;
