import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { render } from '@testing-library/react';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

const WorkOrders = ()=> {
  const classes = useStyles();
  const[wdata,setW]=useState([]);
  const[orders,setOrders]=useState([]);
  const[error,setError]=useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(()=>{
    const url_order = "https://api.hatchways.io/assessment/work_orders";
    const url_worker='';
    fetch(url_order)
    .then(res=>res.json())
    .then(
      (result)=>{
          setIsLoaded(true);
          setOrders(result.orders);
         /*  result.orders.map((orders)=>{           
          fetch(`https://api.hatchways.io/assessment/workers/`+`${orders.workerId}`)
             .then(res=>res.json())
             .then(result=>{
              setIsLoaded(true);
              setW(result.worker);   
              console.log(wdata);           
            },*/
          },
          (error)=>{
               setIsLoaded(true);
               setError(error);
            })  
    },[])
 
  return(
    
     <div className={classes.root}>
        <Grid container spacing={1}>
        {orders.map((orders) => 
         <Grid item xs={6} key={orders.id}>
          <Paper className={classes.paper}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                {orders.name}
              </Grid>
              <Grid item xs={12}>
                {orders.description}
              </Grid>
              <Grid item xs={12}>
                {orders.deadline}
              </Grid>                         
            </Grid>      
            <Grid container spacing={2}>    
           {/*<WorksData id={orders.WorkerId}/>*/}
            </Grid>     
           </Paper>
         </Grid>
         )
      }
        </Grid>
     </div>
  

  );
}
class WorksData extends React.Component{
constructor(props){
  super(props);
  this.state={workdata:null};
}
componentDidMount(){
  fetch("https://api.hatchways.io/assessment/workers/1")
  .then(res=>res.json())
  .then(result=>{
        this.setState({workdata:result.worker});                 
    },
   (error)=>{
   });  
}
  /*const[wdata,setW]=useState([]);
  const[error,setError]=useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(()=>{
     
      fetch('https://api.hatchways.io/assessment/workers/'+ props.id)
      .then(res=>res.json())
      .then(result=>{
         setIsLoaded(true);
           setW(result);   
           console.log(wdata);           
        },
       (error)=>{
           setIsLoaded(true);
           setError(error);
       })   
  fetch(url_worker)
           .then(res=>res.json())
           .then(result=>{
              setIsLoaded(true);
                setW(result.worker);   
                console.log(wdata);           
             },
            (error)=>{
                setIsLoaded(true);
                setError(error);
            })
       },[]);*/
render(){
  const{ workdata}=this.state;
  return(  
    <Grid container spacing={2}>
    
           {workdata.map(workd=>(
             <Grid item xs={6} key={workd.id}>
             {workd.name}
           </Grid>
           ))}
    
   
    </Grid>
  );
}
}
export default WorkOrders