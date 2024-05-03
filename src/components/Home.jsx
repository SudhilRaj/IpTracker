import React, { useEffect, useState } from "react";
import * as L from "leaflet";
import toast, { Toaster } from "react-hot-toast";
import marker from "/pin2.gif";
import { GoChevronRight, GoLocation } from "react-icons/go";
import { CiGlobe } from "react-icons/ci";
import { RiTimeZoneLine } from "react-icons/ri";
import { GrCloudComputer } from "react-icons/gr";


const Home = () => {
   const BASE_URL = "http://ip-api.com/json";
   const url = `${BASE_URL}?fields=585727`;

   const [newIp, setNewIp] = useState("");
   const [ipAddressDetails, setIpAddressDetails] = useState({
      ip: "",
      city: "",
      country: "",
      region: "",
      timezone: "",
      isp: "",
      lat: "",
      lon: ""
   });

   const clearAddressDetails = () => {
      setIpAddressDetails({
         ip: "",
         city: "",
         country: "",
         region: "",
         timezone: "",
         isp: "",
         lat: "",
         lon: ""
      })
   }

   const getData = async () => {
      const data = await fetch(url);
      const parsedData = await data.json();
      if(parsedData.status === "success"){
         setIpAddressDetails({
            ip: parsedData?.query || "",
            city: parsedData?.city || "",
            country: parsedData?.country || "",
            region: parsedData?.region || "",
            timezone: parsedData?.timezone || "",
            isp: parsedData?.isp || "",
            lat: parsedData?.lat || "",
            lon: parsedData?.lon || ""
         })
      }else{
         clearAddressDetails();
      }

      let container = L.DomUtil.get("map");
      if (container != null) {
         container._leaflet_id = null;
      }
      // const map = L.map("map").setView(
      //    [parsedData.lat, parsedData.lon],
      //    13
      // );

      let map = L.map('map', {
         center: [parsedData.lat, parsedData.lon],
         zoom: 13,
         scrollWheelZoom: false
      });

      L.tileLayer(
         "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
         { maxZoom: 35,}
      ).addTo(map);

      let locationIcon = L.icon({
         iconUrl: marker,
         iconSize: [60, 65], // size of the icon
      });

      L.marker(
         [parsedData.lat, parsedData.lon],
         { icon: locationIcon }
      ).addTo(map);
      // .bindPopup('A pretty CSS popup.<br> Easily customizable.')
      // .openPopup();
   };

   const handleClick = async () => {
      try {
         const url = newIp === "" ? `${BASE_URL}?fields=585727` : `${BASE_URL}/${newIp}?fields=585727`;
         const data = await fetch(url);
         const parsedData = await data.json();
         if(parsedData.status === "success"){
            setIpAddressDetails({
               ip: parsedData?.query || "",
               city: parsedData?.city || "",
               country: parsedData?.country || "",
               region: parsedData?.region || "",
               timezone: parsedData?.timezone || "",
               isp: parsedData?.isp || "",
               lat: parsedData?.lat || "",
               lon: parsedData?.lon || ""
            })
            setNewIp("");
         }else{
            clearAddressDetails();
         }

         let container = L.DomUtil.get("map");
         if (container != null) {
            container._leaflet_id = null;
         }
         // const map = L.map("map").setView(
         //    [parsedData.lat, parsedData.lon],
         //    13
         // );

         let map = L.map('map', {
            center: [parsedData.lat, parsedData.lon],
            zoom: 13,
            scrollWheelZoom: false
         });

         L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom: 35,}).addTo(map);
         let locationIcon = L.icon({
            iconUrl: marker,
            iconSize: [60, 65], // size of the icon
         });

         L.marker(
            [parsedData.lat, parsedData.lon],
            { icon: locationIcon }
         ).addTo(map);
         
      } catch (error) {
         console.log(error)
         toast.error("Please enter a valid ip address.", 
         {
            position: "bottom-center",
            ariaProps: {
            role: 'status',
               'aria-live': 'polite',
            }
         });
      }
   };

   useEffect(() => {
      getData();
      // eslint-disable-next-line

      // toast with promise
      // toast.promise(getData(), {
      //    loading: 'Loading',
      //    success: 'Got the data',
      //    error: 'Error when fetching',
      // });
   }, []);

   return (
      <div>
         <div className="bg-center bg-no-repeat bg-cover" style={{backgroundImage: "url(/header-bg3.svg)"}}>
            <div className="header h-[20vh] md:h-[30vh] text-center p-8 text-white">
               <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl pb-4 font-semibold tracking-wider">IP Address Tracker</h1>
               {/* <div className="btnBox container flex items-center w-full sm:w-[80%] lg:w-[60%] relative m-auto bg-white rounded-xl">
                  <input
                     type="text"
                     name="newIp"
                     value={newIp}
                     onChange={(e) => setNewIp(e.target.value)}
                     placeholder="Search for any IP address"
                     className="w-full h-[60px] p-3 border-none rounded-xl outline-none text-black text-[20px]"
                     required
                  />
                  <button className="searchBtn w-[70px] h-[60px] border-none outline-none bg-slate-700 hover:bg-slate-950 cursor-pointer rounded-tr-[12px] rounded-br-[12px]" onClick={handleClick}>
                     <GoChevronRight className="text-2xl inline-block" />
                  </button>
               </div> */}
            </div>

            <div className="flex items-center justify-center">
               <div className="details bg-white h-fit p-3 relative md:absolute flex flex-col justify-center w-[90%] lg:w-[80vw] top-[-50px] sm:top-[-65px] md:top-[100px] z-[999] rounded-xl">

                  {/* Search */}
                  <div className="btnBox container flex items-center w-full sm:w-[80%] lg:w-[60%] relative mx-auto mb-8 mt-3 bg-gray-900 rounded-xl">
                     <input
                        type="text"
                        name="newIp"
                        value={newIp}
                        onChange={(e) => setNewIp(e.target.value)}
                        placeholder="Search for any IP address"
                        className="w-full h-[60px] p-3 border-2 border-gray-900 rounded-xl outline-none text-[16px] md:text-[20px]"
                        required
                     />
                     <button className="searchBtn w-[70px] h-[60px] border-none outline-none bg-gray-900 hover:bg-gray-950 cursor-pointer rounded-tr-[12px] rounded-br-[12px]" onClick={handleClick}>
                        <GoChevronRight className="text-3xl inline-block text-white" />
                     </button>
                  </div>

                  {/* Details */}
                  <div className="container w-full mx-auto">
                     <div className="w-full text-gray-800 leading-normal">
                        <div className="flex flex-wrap">

                           <div className="w-full md:w-1/2 xl:w-1/2 p-3">
                              <div className="bg-gray-900 border border-gray-800 rounded shadow p-2">
                                 <div className="flex flex-row items-center">
                                    <div className="flex-shrink pr-4 hidden sm:block">
                                       <div className="rounded p-3 bg-green-600">
                                          <GrCloudComputer className="text-white" />
                                       </div>
                                    </div>
                                    <div className="flex-1 text-left sm:text-right md:text-center">
                                       <h5 className="font-bold text-lg md:text-xl uppercase text-blue-500">IP ADDRESS</h5>
                                       <h3 className="font-medium text-lg md:text-xl text-white">{ipAddressDetails?.ip || "-"} <span className="text-green-500"><i className="fas fa-caret-up"></i></span></h3>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="w-full md:w-1/2 xl:w-1/2 p-3">
                              <div className="bg-gray-900 border border-gray-800 rounded shadow p-2">
                                 <div className="flex flex-row items-center">
                                    <div className="flex-shrink pr-4 hidden sm:block">
                                       <div className="rounded p-3 bg-pink-600">
                                          <GoLocation className="text-white" />
                                       </div>
                                    </div>
                                    <div className="flex-1 text-left sm:text-right md:text-center">
                                       <h5 className="font-bold text-lg md:text-xl uppercase text-blue-500">LOCATION</h5>
                                       <h3 className="font-medium text-lg md:text-xl text-white">
                                          {ipAddressDetails.city ? ipAddressDetails.city + ", "  : ""}
                                          {ipAddressDetails.country ? ipAddressDetails.country + ", "  : ""}
                                          {ipAddressDetails.region ? ipAddressDetails.region  : "-"}
                                          <span className="text-pink-500"><i className="fas fa-exchange-alt"></i></span>
                                       </h3>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="w-full md:w-1/2 xl:w-1/2 p-3">
                              <div className="bg-gray-900 border border-gray-800 rounded shadow p-2">
                                 <div className="flex flex-row items-center">
                                    <div className="flex-shrink pr-4 hidden sm:block">
                                       <div className="rounded p-3 bg-yellow-600">
                                          <RiTimeZoneLine className="text-white" />
                                       </div>
                                    </div>
                                    <div className="flex-1 text-left sm:text-right md:text-center">
                                       <h5 className="font-bold uppercase text-lg md:text-xl text-blue-500">TIMEZONE</h5>
                                       <h3 className="font-medium text-lg md:text-xl text-white">{ipAddressDetails.timezone ? "UTC - " + ipAddressDetails.timezone  : "-"} <span className="text-yellow-600"><i className="fas fa-caret-up"></i></span></h3>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="w-full md:w-1/2 xl:w-1/2 p-3">
                              <div className="bg-gray-900 border border-gray-800 rounded shadow p-2">
                                 <div className="flex flex-row items-center">
                                    <div className="flex-shrink pr-4 hidden sm:block">
                                       <div className="rounded p-3 bg-blue-600">
                                          <CiGlobe className="text-white" />
                                       </div>
                                    </div>
                                    <div className="flex-1 text-left sm:text-right md:text-center">
                                       <h5 className="font-bold uppercase text-lg md:text-xl text-blue-500">ISP</h5>
                                       <h3 className="font-medium text-lg md:text-xl text-white">{ipAddressDetails?.isp || "-"} </h3>
                                    </div>
                                 </div>
                              </div>
                           </div>

                        </div>
                        {/* <hr className="border-b-2 border-gray-600 my-8 mx-4"></hr> */}
                     </div>
                  </div>

               </div>
            </div>
         </div>

         <div id="map" className="w-full h-screen md:h-[70vh]"></div>
         <Toaster />
      </div>
   );
};

export default Home;