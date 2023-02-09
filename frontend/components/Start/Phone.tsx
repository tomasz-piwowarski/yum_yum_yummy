import Image from "next/image";

export default function Phone() {
  return (
    <div className="relative mt-12 h-full w-full ">
      <Image
        src="/phoneScreen1.jpg"
        width={362}
        height={740}
        alt="phone"
        className="absolute top-0 left-1/4 mx-auto h-[620px] w-[310px]"
      />
      <Image
        src="/phone.png"
        width={372}
        height={750}
        alt="phone"
        className="mx-auto h-[630px] w-[320px]"
      />
    </div>
  );
}
