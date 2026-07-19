import { useEffect, useState } from "react";
import api from "../api/api";

import AdminProfile from "../components/AdminProfile";
import ExportCSV from "../components/ExportCSV";
import ComplaintModal from "../components/ComplaintModal";
import ComplaintHistory from "../components/ComplaintHistory";
import AdminCharts from "../components/AdminCharts";


function AdminPage() {

  const [complaints, setComplaints] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [priorityFilter, setPriorityFilter] = useState("All");

  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const [lastUpdated, setLastUpdated] = useState(new Date());


  // ============================
  // FETCH COMPLAINTS
  // ============================

  useEffect(() => {

    fetchComplaints();


    const interval = setInterval(() => {

      fetchComplaints();

    },10000);


    return () => clearInterval(interval);


  },[]);



  const fetchComplaints = async()=>{

    try{

      const response = await api.get("/complaints");

      setComplaints(response.data);

      setLastUpdated(new Date());

    }
    catch(error){

      console.log(error);

    }
    finally{

      setLoading(false);

    }

  };



  // ============================
  // UPDATE STATUS
  // ============================

  const updateStatus = async(id,status)=>{

    try{

      const data = new FormData();

      data.append(
        "status",
        status
      );


      await api.put(
        `/complaints/${id}`,
        data
      );


      fetchComplaints();


    }
    catch(error){

      console.log(error);

      alert("Unable to update status");

    }

  };




  // ============================
  // DELETE COMPLAINT
  // ============================

  const deleteComplaint = async(id)=>{


    if(!window.confirm("Delete this complaint?"))
      return;


    try{

      await api.delete(
        `/complaints/${id}`
      );


      fetchComplaints();


    }
    catch(error){

      console.log(error);

    }

  };





  // ============================
  // SEARCH + FILTER
  // ============================

  const filteredComplaints = complaints.filter((item)=>{


    const text = search.toLowerCase();


    const matchSearch =

      item.name?.toLowerCase().includes(text)

      ||

      item.location?.toLowerCase().includes(text)

      ||

      item.category?.toLowerCase().includes(text);



    const matchStatus =

      statusFilter==="All"

      ||

      item.status===statusFilter;




    const matchPriority =

      priorityFilter==="All"

      ||

      item.priority===priorityFilter;



    return (
      matchSearch &&
      matchStatus &&
      matchPriority
    );


  });





  // ============================
  // LIVE STATISTICS
  // ============================

  const totalComplaints = complaints.length;


  const pendingComplaints = complaints.filter(
    (item)=>
      item.status==="Pending"
  ).length;



  const progressComplaints = complaints.filter(
    (item)=>
      item.status==="In Progress"
  ).length;




  const resolvedComplaints = complaints.filter(
    (item)=>
      item.status==="Resolved"
  ).length;





return (

<div className="page">


<AdminProfile />



{/* ===========================
    LIVE ADMIN STATS
=========================== */}


<div className="stats-container">


<div className="stat-card">

<h2>
📋 {totalComplaints}
</h2>

<p>
Total Complaints
</p>

</div>



<div className="stat-card">

<h2>
⏳ {pendingComplaints}
</h2>

<p>
Pending
</p>

</div>




<div className="stat-card">

<h2>
🔄 {progressComplaints}
</h2>

<p>
In Progress
</p>

</div>




<div className="stat-card">

<h2>
✅ {resolvedComplaints}
</h2>

<p>
Resolved
</p>

</div>


</div>




<ExportCSV />



<AdminCharts />





<h1 style={{marginTop:"40px"}}>

📋 Complaint Management

</h1>



<p>

Last Updated :
{" "}
{lastUpdated.toLocaleTimeString()}

</p>





<div className="filter-container">



<input

className="search-box"

placeholder="Search Name / Location / Category"

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

/>





<select

value={statusFilter}

onChange={(e)=>
setStatusFilter(e.target.value)
}

>

<option value="All">
All Status
</option>

<option value="Pending">
Pending
</option>

<option value="In Progress">
In Progress
</option>

<option value="Resolved">
Resolved
</option>


</select>





<select

value={priorityFilter}

onChange={(e)=>
setPriorityFilter(e.target.value)
}

>


<option value="All">
All Priority
</option>

<option value="High">
High
</option>

<option value="Medium">
Medium
</option>

<option value="Low">
Low
</option>


</select>


</div>





{
loading ?

<h2>
Loading...
</h2>



:

filteredComplaints.length===0 ?

<h2>
No Complaints Found
</h2>



:


<table className="complaint-table">


<thead>

<tr>

<th>ID</th>
<th>Name</th>
<th>Location</th>
<th>Category</th>
<th>Description</th>
<th>Priority</th>
<th>Status</th>
<th>Map</th>
<th>Image</th>
<th>Date</th>
<th>Update</th>
<th>View</th>
<th>History</th>
<th>Delete</th>


</tr>

</thead>




<tbody>


{

filteredComplaints.map((item)=>(


<tr key={item.id}>


<td>{item.id}</td>

<td>{item.name}</td>

<td>{item.location}</td>

<td>{item.category}</td>

<td>{item.description}</td>




<td>

<span className={`priority ${item.priority?.toLowerCase()}`}>

{item.priority}

</span>

</td>




<td>

<span className={`status ${item.status?.toLowerCase().replace(" ","-")}`}>

{item.status}

</span>

</td>





<td>


{
item.latitude && item.longitude ?

<a

href={`https://www.google.com/maps?q=${item.latitude},${item.longitude}`}

target="_blank"

rel="noreferrer"

>

<button>
📍 Open
</button>


</a>


:

"No Location"

}


</td>





<td>

{

item.image ?

<img

src={`http://127.0.0.1:8000/uploads/${item.image}`}

width="80"

alt="complaint"

/>


:

"No Image"

}


</td>





<td>

{

item.created_at ?

new Date(item.created_at)
.toLocaleDateString()

:

"-"

}


</td>





<td>


<select

value={item.status}

onChange={(e)=>
updateStatus(
item.id,
e.target.value
)
}

>

<option>
Pending
</option>

<option>
In Progress
</option>

<option>
Resolved
</option>


</select>


</td>





<td>


<button

onClick={()=>
setSelectedComplaint(item)
}

>

View

</button>


</td>





<td>

<ComplaintHistory

id={item.id}

/>


</td>





<td>


<button

style={{
background:"#dc2626",
color:"white"
}}

onClick={()=>
deleteComplaint(item.id)
}

>

Delete

</button>


</td>



</tr>


))


}


</tbody>


</table>


}




<ComplaintModal

complaint={selectedComplaint}

onClose={()=>
setSelectedComplaint(null)
}

/>



</div>

);


}


export default AdminPage;