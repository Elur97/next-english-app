import Link from "next/link";

export default function Home() {
  return(
    <main className="flex flex-col items-left justify-center h-screen  bg-cover bg-no-repeat" style={{ backgroundImage: 'url("/image/startScreen.webp")'}}>

    <div className=" bg-opacity-50 px-6 ml-2.5 "></div>
      <h1 className="text-4xl mt-3.5 ml-7 font-bold text-black py-8 bg-opacity-60">AI少女たちと学ぶ！学びなおし英単語</h1>
      <h2 className="text-4xl  font-bold pb-5   ml-48">日常会話 動詞編</h2>
      <Link href="/quiz">
        <button className=" ml-60 px-9 py-4 text-3xl  bg-black text-white rounded-md hover:bg-gray-800">
          START
        </button>
        </Link>
      </main>
  );
}
