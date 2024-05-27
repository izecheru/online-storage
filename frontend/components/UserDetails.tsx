import ProfileImage from "./ProfileImage";

export default function UserDetails({
  username,
  profileImage,
}: {
  username: string;
  profileImage: string;
}) {
  return (
    <div className="user-details">
      <ProfileImage profileImage={profileImage} />
      <p>{username}</p>
    </div>
  );
}
