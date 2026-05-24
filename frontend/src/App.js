import { useEffect, useRef, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

function App() {

  const panelRef = useRef(null);
  const [selectedService, setSelectedService] = useState(
    () => localStorage.getItem("selectedService") || ""
  );
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [activeMode, setActiveMode] = useState(
    () => localStorage.getItem("activeMode") || ""
  );

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.serviceName === selectedService &&
      (
        booking.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
        booking.phoneNumber.includes(searchText)
      )
  );

  const loadBookings = async () => {
    try {
      const response = await fetch(`${API_URL}/bookings`);

      if (!response.ok) {
        throw new Error("Could not load bookings");
      }

      const data = await response.json();
      setBookings(data);
    } catch (error) {
      setMessage("Backend is not reachable. Please try again after starting the backend.");
    }
  };

  useEffect(() => {
    if (selectedService) {
      localStorage.setItem("selectedService", selectedService);
    } else {
      localStorage.removeItem("selectedService");
    }

    if (activeMode) {
      localStorage.setItem("activeMode", activeMode);
    } else {
      localStorage.removeItem("activeMode");
    }
  }, [selectedService, activeMode]);

  useEffect(() => {
    if (activeMode === "find") {
      loadBookings();
    }
  }, [activeMode]);

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (
        selectedService &&
        panelRef.current &&
        !panelRef.current.contains(event.target)
      ) {
        closeService();
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
    };
  }, [selectedService]);

  const bookService = (service) => {
    setSelectedService(service);
    setCustomerName("");
    setPhoneNumber("");
    setSearchText("");
    setActiveMode("");
    setMessage("");
  };

  const closeService = () => {
    setSelectedService("");
    setActiveMode("");
    setCustomerName("");
    setPhoneNumber("");
    setSearchText("");
    setMessage("");
  };

  const closeMode = () => {
    setActiveMode("");
    setMessage("");
  };

  const openRegister = () => {
    setActiveMode("register");
    setMessage("");
  };

  const openFind = () => {
    setActiveMode("find");
    setMessage("");
  };

  const submitBooking = async () => {
    if (!customerName || !phoneNumber) {
      setMessage("Please enter name and phone number");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          serviceName: selectedService,
          customerName,
          phoneNumber
        })
      });

      if (!response.ok) {
        throw new Error("Booking failed");
      }

      setCustomerName("");
      setPhoneNumber("");
      setMessage("Booking submitted successfully");
      loadBookings();
    } catch (error) {
      setMessage("Backend is not reachable. Please try again after starting the backend.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      padding: "20px",
      fontFamily: "Arial",
      backgroundColor: "#f5f5f5",
      minHeight: "100vh"
    }}>

      <div style={heroStyle}>
        <div>
          <h1 style={{ margin: 0 }}>GaonSathi</h1>
          <p style={{ margin: "8px 0 0" }}>Gaon ki har seva, ek jagah</p>
        </div>
      </div>

      <hr />

      <h2 className="mb-3">Available Services</h2>

      <div className="row g-3">
        <div className="col-12 col-md-4">
          <div style={cardStyle}>
            <h3>
              <i className="bi bi-lightning-charge-fill" style={iconStyle}></i>
              Electrician
            </h3>
            <button className="btn btn-success" onClick={() => bookService("Electrician")}>
              Open
            </button>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div style={cardStyle}>
            <h3>
              <i className="bi bi-tools" style={iconStyle}></i>
              Plumber
            </h3>
            <button className="btn btn-success" onClick={() => bookService("Plumber")}>
              Open
            </button>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div style={cardStyle}>
            <h3>
              <i className="bi bi-truck" style={iconStyle}></i>
              Tractor Booking
            </h3>
            <button className="btn btn-success" onClick={() => bookService("Tractor Booking")}>
              Open
            </button>
          </div>
        </div>
      </div>

      {selectedService && (
        <div style={{
          marginTop: "30px",
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "10px"
        }} ref={panelRef}>

          <div style={panelHeaderStyle}>
            <h2 style={{ margin: 0 }}>{selectedService}</h2>
            <button className="btn btn-outline-danger btn-sm" onClick={closeService}>
              <i className="bi bi-x-lg"></i> Hide
            </button>
          </div>

          <div style={actionRowStyle}>
            <button style={buttonStyle} onClick={openRegister}>
              Register New
            </button>

            <button style={secondaryButtonStyle} onClick={openFind}>
              Find Registered
            </button>
          </div>

          {activeMode === "register" && (
            <div style={sectionStyle}>
              <div style={panelHeaderStyle}>
                <h2 style={{ margin: 0 }}>Register New</h2>
                <button className="btn btn-outline-secondary btn-sm" onClick={closeMode}>
                  Hide
                </button>
              </div>

              <input
                type="text"
                placeholder="Enter Name"
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
                style={inputStyle}
              />

              <br /><br />

              <input
                type="tel"
                placeholder="Enter Phone Number"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                style={inputStyle}
              />

              <br /><br />

              <button
                style={buttonStyle}
                onClick={submitBooking}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Register"}
              </button>

              {message && (
                <p style={{ marginTop: "15px", color: message.includes("successfully") ? "green" : "crimson" }}>
                  {message}
                </p>
              )}
            </div>
          )}

          {activeMode === "find" && (
            <div style={sectionStyle}>
              <div style={panelHeaderStyle}>
                <h2 style={{ margin: 0 }}>Already Registered</h2>
                <button className="btn btn-outline-secondary btn-sm" onClick={closeMode}>
                  Hide
                </button>
              </div>

              <input
                type="text"
                placeholder="Search by name or number"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                style={inputStyle}
              />

              {filteredBookings.length === 0 ? (
                <p>No registered people found</p>
              ) : (
                filteredBookings.map((booking) => (
                  <div key={booking.id} style={bookingStyle}>
                    <div>
                      <h3 style={{ margin: "0 0 8px" }}>{booking.customerName}</h3>
                      <p style={detailStyle}>Phone: <b>{booking.phoneNumber}</b></p>
                    </div>

                    <a href={`tel:${booking.phoneNumber}`} style={callButtonStyle}>
                      Call
                    </a>
                  </div>
                ))
              )}
            </div>
          )}

        </div>
      )}

    </div>
  );
}

const cardStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  height: "100%"
};

const heroStyle = {
  minHeight: "190px",
  display: "flex",
  alignItems: "end",
  padding: "24px",
  color: "white",
  borderRadius: "10px",
  backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 80, 30, 0.75)), url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80')",
  backgroundPosition: "center",
  backgroundSize: "cover"
};

const iconStyle = {
  color: "green",
  marginRight: "8px"
};

const inputStyle = {
  width: "300px",
  padding: "10px"
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "green",
  color: "white",
  border: "none",
  borderRadius: "5px"
};

const secondaryButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#1f4e79",
  color: "white",
  border: "none",
  borderRadius: "5px"
};

const actionRowStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "12px",
  marginBottom: "20px"
};

const panelHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
  marginBottom: "18px"
};

const sectionStyle = {
  padding: "20px",
  backgroundColor: "#fafafa",
  borderRadius: "10px",
  marginTop: "15px"
};

const bookingStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "15px",
  padding: "15px",
  marginTop: "12px",
  border: "1px solid #ddd",
  borderRadius: "8px"
};

const detailStyle = {
  margin: "4px 0"
};

const callButtonStyle = {
  padding: "10px 18px",
  backgroundColor: "#0b7a2a",
  color: "white",
  textDecoration: "none",
  borderRadius: "5px",
  whiteSpace: "nowrap"
};

export default App;
