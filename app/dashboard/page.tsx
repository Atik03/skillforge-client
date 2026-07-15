"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";


export default function DashboardPage() {

  const router = useRouter();


  const {
    data: session,
    isPending,
  } = authClient.useSession();



  useEffect(() => {


    const checkRole = async()=>{


      if(!session?.user?.email)
        return;



      try{


        const res =
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/${session.user.email}`
          );


        const result =
          await res.json();



        if(result.success){


          const role =
            result.data.role;



          if(role === "admin"){

            router.replace(
              "/dashboard/admin"
            );


          }else{

            router.replace(
              "/dashboard/student"
            );

          }


        }



      }catch(error){

        console.log(error);

      }


    };



    checkRole();


  },[
    session,
    router
  ]);





  if(isPending){

    return (

      <div className="min-h-screen flex items-center justify-center">

        <span className="loading loading-spinner loading-lg" />

      </div>

    );

  }



  return null;

}