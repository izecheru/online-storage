import "@/style/fetchingDataLoading.scss";
import Image from "next/image";

export default function FetchingDataLoading() {
  return (
    <div className="fetching-data">
      <h1>Fetching data </h1>
      <Image
        className="loading-icon"
        src="/loading.svg"
        width={50}
        height={50}
        alt="loading"
      />
    </div>
  );
}
