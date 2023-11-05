"use client";
import { useState } from "react";
import Countries from "./comp/Countries";


export default function Home() {
  const [search, setSearch] = useState('');
  return (
    <main className="">
      <div className={'w-4/6 text-center p-6 mx-auto m-2 rounded-md'}>
        <input placeholder="Ülke gir" content={search} type="text" className={'w-full rounded-md p-4 font-semibold border-0 outline-none'} onKeyUp={e => setSearch(e.currentTarget.value)}></input>
      </div>
      <Countries search={search} />
    </main>
  )
}
