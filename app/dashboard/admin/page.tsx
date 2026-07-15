"use client";
import Link from "next/link";

import { useEffect, useState } from "react";
import {
  BookOpen,
  Users,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";



interface AdminStats {

  totalCourses: number;

  totalStudents: number;

  totalAdmins: number;

  totalEnrollments: number;

}



export default function AdminDashboardPage() {


  const {
    data: session,
  } = authClient.useSession();



  const [stats, setStats] =
    useState<AdminStats | null>(null);



  const [loading, setLoading] =
    useState(true);



  useEffect(()=>{


    const loadStats = async()=>{


      try{


        const res =
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/dashboard/stats`
          );


        const result =
          await res.json();



        if(result.success){

          setStats(
            result.data
          );

        }


      }catch(error){

        console.log(error);

      }
      finally{

        setLoading(false);

      }


    };



    loadStats();


  },[]);

  const cards = [

    {
      title:"Total Courses",
      value:stats?.totalCourses || 0,
      icon:BookOpen,
    },


    {
      title:"Total Students",
      value:stats?.totalStudents || 0,
      icon:Users,
    },


    {
      title:"Enrollments",
      value:stats?.totalEnrollments || 0,
      icon:GraduationCap,
    },


    {
      title:"Admins",
      value:stats?.totalAdmins || 0,
      icon:ShieldCheck,
    },

  ];


  return (

    <div className="space-y-8">


      <div>

        <h1 className="text-3xl font-bold">

          Admin Dashboard

        </h1>


        <p className="text-base-content/70 mt-2">

          Manage SkillForge platform.

        </p>

      </div>


      {
        loading ? (

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">


            {
              [1,2,3,4].map(item=>(

                <div
                  key={item}
                  className="card bg-base-100 shadow"
                >

                  <div className="card-body">

                    <div className="skeleton h-20 w-full"/>

                  </div>

                </div>

              ))
            }


          </div>


        ) : (


          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">


            {
              cards.map((item)=>{


                const Icon =
                  item.icon;



                return (

                  <div

                    key={item.title}

                    className="card bg-base-100 border border-base-300 shadow"

                  >

                    <div className="card-body">


                      <div className="flex justify-between items-center">


                        <div>


                          <p className="text-sm opacity-70">

                            {item.title}

                          </p>


                          <h2 className="text-3xl font-bold mt-2">

                            {item.value}

                          </h2>


                        </div>



                        <div className="bg-primary/10 p-3 rounded-xl">


                          <Icon

                            size={30}

                            className="text-primary"

                          />


                        </div>


                      </div>


                    </div>


                  </div>

                );


              })
            }


          </div>


        )
      }

      <div className="grid lg:grid-cols-2 gap-6">


        <div className="card bg-base-100 border shadow">

          <div className="card-body">


            <h2 className="card-title">

              Course Management

            </h2>


            <p>

              Add, update and delete courses.

            </p>


           <Link href="/dashboard/admin/courses" className="btn btn-primary mt-4">
  Manage Courses
            </Link>


          </div>


        </div>

        <div className="card bg-base-100 border shadow">


          <div className="card-body">


            <h2 className="card-title">

              User Management

            </h2>


            <p>

              Manage students and admins.

            </p>


            <Link href="/dashboard/admin/users" className="btn btn-primary mt-4">
             Manage Users
            </Link>


          </div>


        </div>


      </div>




    </div>

  );

}