import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";

const FriendCard = ({ friend }) => {
  return (
    <div className="card shadow-sm w-100 border-0" style={{
      background: "linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)",
      borderRadius: "16px",
      boxShadow: "0 8px 25px rgba(0, 86, 179, 0.12)"
    }}>
      <div className="card-body p-4">
        <div className="d-flex align-items-center gap-3 mb-3">
          <div>
            <img src={friend.profilePic || "/media/fallback-avatar.png"} alt={friend.fullName} className="rounded-circle border boredr-2" style={{ width: "40px", height: "40px", objectFit: "cover", borderColor: "#0056b3", }} />
          </div>
          <h5 className="fw-semibold text-truncate mb-0 text-primary">{friend.fullName}</h5>
        </div>

        <div className="d-flex flex-wrap gap-2 mb-3">
          <span className="badge d-flex align-items-center"
            style={{
              backgroundColor: "#eaf2ff",
              color: "#0056b3",
              borderRadius: "20px",
              padding: "0.5rem 0.75rem",
              fontSize: "0.8rem",
              fontWeight: "500",
            }}>
            {getLanguageFlag(friend.nativeLanguage)}
            <span className="ms-1">Native: {friend.nativeLanguage}</span>
          </span>
          <span className="badge d-flex align-items-center"
            style={{
              backgroundColor: "#eaf2ff",
              color: "#0056b3",
              borderRadius: "20px",
              padding: "0.5rem 0.75rem",
              fontSize: "0.8rem",
              fontWeight: "500",
            }}>
            {getLanguageFlag(friend.learningLanguage)}
            <span className="ms-1">Learning: {friend.learningLanguage}</span>
          </span>
        </div>

        <Link to={`/chatPage/${friend._id}`} className="btn w-100 fw-semibold"
          style={{
            backgroundColor: "#0056b3",
            color: "white",
            borderRadius: "12px",
            padding: "0.6rem",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#004085")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#0056b3")
          }>
          Message
        </Link>
      </div>
    </div>
  );
};
export default FriendCard;

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="me-1"
        style={{ height: "14px" }}
      />
    );
  }
  return null;
}