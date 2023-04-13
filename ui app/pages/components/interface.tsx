import React, { useEffect, useState, useRef } from "react";
import { WalletContext } from "@/context/wallet";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Image from "next/image";
import { useContext } from "react";
interface Data {
  from: string;
  to: string;
  date: string;
  cabin: Cabin;
}

enum Cabin {
  economy,
  comfort,
}

const Interface = () => {
  const { address } = useContext(WalletContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Data>();
  const [active, setactive] = useState(false);
  const [loader, setloader] = useState(false);
  let [data, setdata] = useState([]);
  let [info, setinfo] = useState([]);
  let [from, setfrom] = useState(false);
  let [to, setto] = useState(false);
  let [pricing, setpricing] = useState([]);
  let [adult, setadult] = useState(0);
  let [childcount, setchildcount] = useState(0);
  let [depart, setdepart] = useState("");
  let [arrive, setarrive] = useState("");
  let [departiata, setdepartiata] = useState("");
  let [arriveiata, setarriveiata] = useState("");
  let [date, setdate] = useState("");
  let [year, setyear] = useState("");
  let [month, setmonth] = useState("");

  const options = {
    method: "POST",
    url: "https://skyscanner-api.p.rapidapi.com/v3/flights/live/search/create",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": `${API_KEY}`,
      "X-RapidAPI-Host": "skyscanner-api.p.rapidapi.com",
    },
    data: `{"query":{"market":"UK","locale":"en-GB","currency":"EUR","queryLegs":[{"originPlaceId":{"iata":"${departiata}"},"destinationPlaceId":{"iata":"${arriveiata}"},"date":{"year":${year},"month":${month},"day":${date}}}],"cabinClass":"CABIN_CLASS_ECONOMY","adults":2,"childrenAges":[3,9]}}`,
  };

  const validate: SubmitHandler<Data> = (props) => {
    console.log(props);
    setyear(props.date.slice(0, 4));
    if (Number(props.date.slice(5, 7)) > 9) {
      setmonth(props.date.slice(5, 7));
    } else {
      setmonth(props.date.slice(6, 7));
    }
    console.log(month);
    setdate(props.date.slice(8, 10));
    flights();
  };

  const flights = () => {
    setloader(true);
    axios
      .request(options)
      .then(function (response) {
        const access = response.data.content.results.carriers;
        const legs = response.data.content.results.legs;
        const fare = response.data.content.results.itineraries;
        const destiny = Object.values(legs);
        const keys = Object.values(access);
        const price = Object.values(fare);
        setdata(keys);
        setpricing(price);
        setinfo(destiny);
        setloader(false);
        // console.log(destiny);
        // console.log(price[0].pricingOptions[0].price.amount);
        // console.log(response.data.content);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const select = useRef();
  useEffect(() => {
    console.log(select);
  }, [select]);

  return (
    <div className=" flex h-fit flex-col gap-2 items-center justify-center mt-10 ">
      {/* `CEnter` */}
      <div>
        <form
          onSubmit={handleSubmit(validate)}
          className="flex flex-col items-center space-y-8"
          onMouseLeave={() => {
            setfrom(false);
            setto(false);
          }}
        >
          <div className=" flex flex-col md:flex-row md:space-x-10 md:space-y-0 space-y-6">
            <div className="relative" onClick={() => setfrom(true)}>
              <label className=" relativeflex flex-col space-y-3">
                <h2 className="text-xl">From</h2>
                <input
                  type="text"
                  {...register("from", { required: true })}
                  className="border shadow-md rounded-md h-8 focus:outline-none p-1"
                  value={depart}
                ></input>

                {from && (
                  <div className="absolute top-20 border rounded-md shadow-md p-5 z-5 bg-white w-48">
                    <p
                      className="cursor md:hover:cursor-pointer md:hover:font-semibold"
                      onClick={() => {
                        setdepart("ORD");
                        setdepartiata("ATL");
                      }}
                    >
                      USA
                    </p>
                    <p
                      className="cursor md:hover:cursor-pointer md:hover:font-semibold"
                      onClick={() => {
                        setdepart("Delhi");
                        setdepartiata("DEL");
                      }}
                    >
                      Delhi
                    </p>
                    <p
                      className="cursor md:hover:cursor-pointer md:hover:font-semibold"
                      onClick={() => {
                        setdepart("Dubai");
                        setdepartiata("DXB");
                      }}
                    >
                      Dubai
                    </p>
                  </div>
                )}
              </label>
            </div>

            {errors.from && <p>Please select Start</p>}
            <div
              className="relative"
              onClick={() => {
                setto(true);
                setfrom(false);
              }}
            >
              <label className=" relativeflex flex-col space-y-3">
                <h2 className="text-xl">To</h2>
                <input
                  type="text"
                  {...register("to", { required: true })}
                  className="border shadow-md rounded-md h-8 focus:outline-none p-1"
                  value={arrive}
                ></input>

                {to && (
                  <div className="absolute top-20 border rounded-md shadow-md p-5 z-5 bg-white w-48">
                    <p
                      className="cursor md:hover:cursor-pointer md:hover:font-semibold"
                      onClick={() => {
                        setarrive("USA");
                        setarriveiata("ORD");
                      }}
                    >
                      USA
                    </p>
                    <p
                      className="cursor md:hover:cursor-pointer md:hover:font-semibold"
                      onClick={() => {
                        setarrive("Delhi");
                        setarriveiata("DEL");
                      }}
                    >
                      Delhi
                    </p>
                    <p
                      className="cursor md:hover:cursor-pointer md:hover:font-semibold"
                      onClick={() => {
                        setarrive("Dubai");
                        setarriveiata("DXB");
                      }}
                    >
                      Dubai
                    </p>
                  </div>
                )}
              </label>
            </div>
            {errors.to && <p>Please select Destination</p>}
            <label className="flex flex-col space-y-3">
              <h2 className="text-xl">Specify the date</h2>
              <input
                type="date"
                {...register("date", { required: true })}
                className="border shadow-md rounded-md h-8 focus:outline-none p-1"
              ></input>
            </label>
            {errors.date && <p>Please select date</p>}

            <label className="flex flex-col space-y-3">
              <h2 className="text-xl">Cabin</h2>
              <select
                {...register("cabin", { required: true })}
                className=" border shadow-md rounded-md  w-28 space-x-2 h-8 focus:outline-none p-1"
              >
                <option>Select</option>
                <option>Economy</option>
                <option>Comfort</option>
              </select>
            </label>
            {errors.cabin && <p>Please select cabin</p>}
          </div>
          {!active && (
            <button
              className="bg-yellow-200 rounded-full w-20 py-1"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setactive(true);
              }}
            >
              Submit
            </button>
          )}
          {active && (
            <div className="flex flex-col w-full bg-white p-2 rounded-md border shadow-lg gap-5 md:gap-3">
              <button
                className="flex justify-end text-2xl text-blue-700"
                onClick={(e) => {
                  e.preventDefault();
                  setactive(!active);
                  setadult(0);
                  setchildcount(0);
                }}
              >
                <div className="bg-gray-100 rounded-full w-10 h-10 saturate-0 mb-7 md:mb-3">
                  x
                </div>
              </button>
              <label className="flex space-x-3 justify-around md:w-2/3 w-full mx-auto">
                <p className="text-xl">Adult</p>
                <div className="flex space-x-3 items-center w-16 md:w-24 justify-around">
                  <button
                    className="text-2xl"
                    onClick={(e) => {
                      e.preventDefault();
                      setadult((adult += 1));
                    }}
                  >
                    +
                  </button>
                  <p className="text-xl">{adult}</p>
                  <button
                    className="text-2xl"
                    onClick={(e) => {
                      e.preventDefault();
                      if (adult > 0) {
                        setadult((adult -= 1));
                      }
                    }}
                  >
                    -
                  </button>
                </div>
              </label>
              <label className="flex space-x-3 justify-around w-full md:w-2/3 mx-auto">
                <p className="text-xl">Child</p>
                <div className="flex space-x-3 items-center w-16 md:w-24 justify-around">
                  <button
                    className="text-2xl"
                    onClick={(e) => {
                      e.preventDefault();
                      setchildcount((childcount += 1));
                    }}
                  >
                    +
                  </button>
                  <p className="text-xl">{childcount}</p>
                  <button
                    className="text-2xl"
                    onClick={(e) => {
                      e.preventDefault();
                      if (childcount > 0) {
                        setchildcount((childcount -= 1));
                      }
                    }}
                  >
                    -
                  </button>
                </div>
              </label>
              <button
                className="mt-4 mb-5 bg-yellow-200 w-1/2 mx-auto rounded-md"
                type="submit"
              >
                Search
              </button>
            </div>
          )}
        </form>
      </div>
      {/* `Bottom` */}

      {loader ? (
        <Image className="" src="/loader.gif" width={400} height={400} />
      ) : (
        <div className="flex  flex-col gap-6 w-full mt-8 mb-10">
          {data.map((e, i) => {
            return (
              <div
                onClick={(p) => {
                  p.preventDefault();
                  console.log(
                    e.name,
                    ", Duration:",
                    info[i].durationInMinutes,
                    "fare:",
                    Math.round(pricing[i].pricingOptions[0].price.amount)
                  );
                }}
                key={i}
                className=" flex items-center max-w-3xl w-full mx-auto h-20 border justify-between rounded-sm p-4 shadow-md shadow-gray-100 cursor-pointer"
              >
                <img
                  src={e.imageUrl}
                  className="w-16 h-10 object-contain"
                  alt="carrier logo"
                ></img>
                <p className="w-1/6 ml-4">{e.name}</p>
                <div className="flex flex-col items-center ml-7">
                  <p>
                    {depart} <span className="text-xl">→ </span>
                    {arrive}
                  </p>
                  <p className="text-sm font-semibold">
                    Duration: {info[i].durationInMinutes}min
                  </p>
                </div>
                <div className=" ml-8">
                  <div className="flex justify-between items-center">
                    <p className="w-14">Depart </p>
                    <p className="text-sm">
                      {info[i].departureDateTime.day}-
                      {info[i].departureDateTime.month}-
                      {info[i].departureDateTime.year}
                    </p>{" "}
                    <p className="p-1 ml-2 w-14 text-right">
                      {info[i].departureDateTime.hour} :{" "}
                      {info[i].departureDateTime.minute}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="w-14">Arrival </p>
                    <p className="text-sm">
                      {info[i].arrivalDateTime.day}-
                      {info[i].arrivalDateTime.month}-
                      {info[i].arrivalDateTime.year}
                    </p>{" "}
                    <p className="p-1 ml-2 w-14 text-right">
                      {info[i].arrivalDateTime.hour} :{" "}
                      {info[i].arrivalDateTime.minute}
                    </p>
                  </div>
                </div>
                <div className="ml-8 w-28">
                  <p>
                    Fare:{" "}
                    <span className="font-mono p-1 underline underline-offset-8 decoration-blue-200">
                      {Math.round(pricing[i].pricingOptions[0].price.amount)}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Interface;
