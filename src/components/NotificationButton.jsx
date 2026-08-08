import { supabase } from "../services/supabase";
import { generateToken } from "../services/firebase";

function NotificationButton({ onSuccess }) {
  const enableNotifications = async () => {
    const token = await generateToken();

    if (!token) return;

    const { error } = await supabase
      .from("notification_tokens")
      .insert({
        token,
      });

    if (error) {
      console.error(error);
      alert("Failed to save notification token.");
      return;
    }

    alert("🎉 Notifications Enabled Successfully!");

    // Close the popup after success
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <button
      className="btn"
      onClick={enableNotifications}
    >
      🔔 Enable Notifications
    </button>
  );
}

export default NotificationButton;