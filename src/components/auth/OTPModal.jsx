import { useState, useRef, useEffect } from "react";
import "../OTPModal.css";

export default function OTPModal({ isOpen, onClose, onVerify, onResend }) {
  const [digits, setDigits] = useState(["" ,"", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const inputsRef = useRef([]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setDigits(["", "", "", "", "", ""]);
      setError("");
      setIsLoading(false);
      setTimer(30);
      setTimeout(() => inputsRef.current[0]?.focus(), 100);
    }
  }, [isOpen]);

  // Countdown timer
  useEffect(() => {
    if (!isOpen || timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [isOpen, timer]);

  if (!isOpen) return null;

  const otp = digits.join("");

  const handleDigitChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...digits];
    next[index] = value;
    setDigits(next);
    if (error) setError("");
    // Auto-advance to next input
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const next = [...digits];
    for (let i = 0; i < 6; i++) next[i] = pasted[i] || "";
    setDigits(next);
    const focusIdx = Math.min(pasted.length, 5);
    inputsRef.current[focusIdx]?.focus();
  };

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      await onVerify(otp);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;
    try {
      if (onResend) await onResend();
      setTimer(30);
      setDigits(["", "", "", "", "", ""]);
      setError("");
      inputsRef.current[0]?.focus();
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <div className="otp-overlay">
      <div className="otp-modal">
        <h3>Verify OTP</h3>
        <p>Enter the 6-digit OTP sent to your mobile number</p>

        {error && (
          <p className="text-red-500 text-xs text-center mb-3 font-medium bg-red-50 py-1 rounded-lg">
            {error}
          </p>
        )}

        <div className="otp-inputs" onPaste={handlePaste}>
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => (inputsRef.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={(e) => handleDigitChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              autoFocus={i === 0}
            />
          ))}
        </div>

        <button onClick={handleVerify} disabled={isLoading}>
          {isLoading ? "Verifying..." : "Verify OTP"}
        </button>

        <div className="otp-secondary">
          {timer > 0 ? (
            <>Resend in <strong>{timer}s</strong></>
          ) : (
            <span onClick={handleResend}>Resend OTP</span>
          )}
        </div>

        <button
          onClick={onClose}
          style={{ background: "transparent", color: "#64748b", marginTop: 8, fontSize: 13 }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
