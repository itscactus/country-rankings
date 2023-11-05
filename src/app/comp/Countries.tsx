'use client';
import { useEffect, useState } from "react";
import useSWR from "swr"
const fetcher = (url: any) => fetch(url).then((res) => res.json());

interface Country {
    name: {
        common: string;
        official: string;
    }
    altSpellings: string[]; 
    tld: string[];
    cca2: string;
    ccn3: string;
    cca3: string;
    independent: true | false;
    status: string;
    unMember: true | false;
    currencies: {};
    idd: {
        root: string;
        suffixes: string[];
    }
    capital: string[];
    region: string;
    subregion: string;
    languages: {};
    translations: {};
    latlng: string[];
    landlocked: true | false;
    area: number;
    demonyms: {};
    flag: string;
    maps: {};
    population: number;
    fifa: string;
    car: {
        signs: string[];
        side: string;
    }
    timezones: string[];
    continents: string[];
    flags: {
        png: string;
        svg: string;
    };
    postalCode: {
        format: string;
        regex: string;
    }
};
// https://restcountries.com/v3.1/all
export default function Countries({ search="" }) {
    const [data, setData] = useState(Array<Country>);
    const [error, setError] = useState(String);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        fetch('https://restcountries.com/v3.1/all').then(res => res.json())
        .then((response) => {
            if(search.trim().length > 0){
                console.log(search)
                var indexes: any = []; 
                data.map((e, index) => {
                    let altSpellings = e.altSpellings.length > 0 ? e.altSpellings.map((v) => v.toLowerCase()).join(' ') : e.name.official.toLowerCase();
                    if(altSpellings.includes(search.toLowerCase())) {
                        indexes.push(index);
                    }
                });
                let rdata = indexes.map((index: number) => data[index]);
                setData(rdata)
            } else setData(response)
            setLoading(false);
        })
    }, [search]);

    if(error) return (
        <>
            Hata çıktı karşm
        </>
    )
    if(isLoading) return (
        <>
            Yükleniyor.
        </>
    )
    return (
        <>
            {
                data.map((c,i) => {
                    return (
                        <div className="bg-white rounded-md w-4/5 p-2 m-2 mx-auto text-center">
                            <div className="flex flex-row justify items-center">
                                <img src={c.flags.png} className={'w-32'} />
                                <div className="font-semibold text-lg w-1/4">{c.name.common}</div>
                                <div className="font-semibold text-lg w-1/4">{c.population} Nufüs</div>
                                <div className="font-semibold text-lg w-1/4">{c.independent == false ? 'Bağımsız' : 'Bağımlı'}</div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}