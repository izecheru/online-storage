import Image from "next/image";
export default function ProfileImage({
  profileImage,
}: {
  profileImage: string;
}) {
  if (profileImage.length === 0)
    return (
      <Image
        src="/profile-picture.svg"
        width={100}
        height={100}
        alt="profile-image"
      />
    );

  return (
    <Image src={profileImage} width={100} height={100} alt="profile-image" />
  );
}
