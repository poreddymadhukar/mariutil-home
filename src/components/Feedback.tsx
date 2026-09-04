import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const feedbackEndpoint = import.meta.env.VITE_FEEDBACK_API_URL as
  | string
  | undefined;
type FeedbackStatus = "idle" | "submitting" | "success" | "error";

export default function Feedback() {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FeedbackStatus>("idle");
  const [error, setError] = useState("");
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const close = () => {
    if (status === "submitting") return;
    setIsOpen(false);
    setStatus("idle");
    setError("");
  };

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, status]);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!feedbackEndpoint) {
      setStatus("error");
      setError("Feedback is not configured yet. Please try again later.");
      return;
    }
    setStatus("submitting");
    setError("");
    try {
      const response = await fetch(feedbackEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, message: message.trim() }),
      });
      if (!response.ok)
        throw new Error("The feedback service could not accept your message.");
      setStatus("success");
      setMessage("");
      setRating(null);
    } catch (submitError) {
      setStatus("error");
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to send feedback. Please try again.",
      );
    }
  };

  return (
    <>
      <button
        className="feedback-link"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        Send feedback
      </button>
      {isOpen && (
        <div
          className="feedback-backdrop"
          role="presentation"
          onMouseDown={close}
        >
          <section
            aria-labelledby="feedback-title"
            aria-modal="true"
            className="feedback-dialog"
            role="dialog"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              aria-label="Close feedback form"
              className="feedback-close"
              disabled={status === "submitting"}
              type="button"
              onClick={close}
            >
              <X size={19} aria-hidden="true" />
            </button>
            <p className="section-label">Feedback</p>
            <h3 id="feedback-title">Help improve Mariutil</h3>
            <p className="feedback-intro">
              Your feedback is stored anonymously. Do not include sensitive
              information.
            </p>
            {status === "success" ? (
              <div className="feedback-success" role="status">
                <p>Thanks. Your feedback was sent.</p>
                <button type="button" onClick={close}>
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={submit}>
                <fieldset className="feedback-rating">
                  <legend>How was your experience? Optional.</legend>
                  <div>
                    {[1, 2, 3, 4, 5].map((value) => (
                      <label key={value}>
                        <input
                          checked={rating === value}
                          name="rating"
                          type="radio"
                          value={value}
                          onChange={() => setRating(value)}
                        />
                        <span>{value}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <label className="feedback-message" htmlFor="feedback-message">
                  What could be better?
                  <textarea
                    id="feedback-message"
                    maxLength={1000}
                    minLength={3}
                    required
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                  />
                </label>
                {status === "error" && (
                  <p className="feedback-error" role="alert">
                    {error}
                  </p>
                )}
                <button
                  className="feedback-submit"
                  disabled={status === "submitting"}
                  type="submit"
                >
                  {status === "submitting" ? "Sending..." : "Send feedback"}
                </button>
              </form>
            )}
          </section>
        </div>
      )}
    </>
  );
}
