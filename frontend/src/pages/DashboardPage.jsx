function DashboardPage() {



  const cityStats = [

    {

      icon: "👥",

      title: "Population",

      value: "5,20,000"

    },

    {

      icon: "🏥",

      title: "Hospitals",

      value: "85"

    },

    {

      icon: "🏫",

      title: "Schools",

      value: "240"

    },

    {

      icon: "🌳",

      title: "Parks",

      value: "65"

    },

    {

      icon: "🚦",

      title: "Traffic Zones",

      value: "120"

    },

    {

      icon: "🗑️",

      title: "Waste Collection Points",

      value: "350"

    }

  ];





  const recommendations = [

    "Increase waste collection in Zone 4.",

    "Repair damaged roads in Sector 8.",

    "Monitor high traffic during peak hours.",

    "Improve drainage in flood-prone areas."

  ];





  return (



    <div className="dashboard">





      <h2>

        🏙️ Smart City Dashboard

      </h2>





      {/* City Statistics */}



      <div className="cards">



        {

          cityStats.map((item,index)=>(



            <div className="card" key={index}>



              <h1>

                {item.icon}

              </h1>



              <h3>

                {item.title}

              </h3>



              <p>

                {item.value}

              </p>



            </div>



          ))

        }



      </div>







      {/* AI Recommendations */}



      <div className="ai-box">



        <h3>

          🤖 AI Recommendations

        </h3>





        <ul>



          {

            recommendations.map((item,index)=>(



              <li key={index}>

                {item}

              </li>



            ))

          }



        </ul>





      </div>





    </div>



  );

}





export default DashboardPage;