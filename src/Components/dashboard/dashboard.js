import React, {Component} from 'react'
import axios from 'axios'
//import Highcharts from 'highcharts'
import './dashboard.scss'
import HighchartsReact from 'highcharts-react-official'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import Highcharts from 'highcharts/highstock'

export default class dashboard extends Component{
  constructor(props) {
    super(props);

    this.state = {
          Day: 12,
          logged_in: localStorage.getItem('id_token') ? true : false,
          Month: 10,
          Year:2019,
          media_Source : "",
          info: [],
          dashboard_name : "",
          dashboard : "Untitled",

    };
}



  componentDidMount(){
    this.datacall();
   }

  datacall =()=>{
    if (this.state.logged_in) {
      axios.get(`http://127.0.0.1:8000/graph/?Media_Source=${this.state.media_Source}
        &dashboard__name=${this.state.dashboard}`)
      .then((res)=>{
        console.log(res.data)
        this.setState({info: res.data})
        res.data.length>1 ? this.setState({dashboard_name: res.data[0].dashboard})
         : this.setState({dashboard_name: this.state.dashboard})
      })
    }
  }

  onApplying = (event, picker) => {
     this.setState({Year: picker.startDate.format('YYYY')})
     this.setState({Month: picker.startDate.format('MM')})
     this.setState({Day: picker.startDate.format('DD')})
      }
  Untitled =()=>{
    this.setState({dashboard : "Untitled"})
  }
  sample1 =()=>{
    this.setState({dashboard : "Sample1"})
  }
  Report_UAC =()=>{
    this.setState({dashboard : "ReportUAC"})
  }
  Default3 =()=>{
    this.setState({dashboard : "Default3"})
  }
  dash1 = async () =>{
    await this.Untitled()
    this.datacall()
  }
  dash2 = async () =>{
    await this.sample1()
    this.datacall()
  }
  dash3 = async () =>{
    await this.Report_UAC()
    this.datacall()
  }
  dash4 = async () =>{
    await this.Default3()
    this.datacall()
  }

  media_filter=(event)=>{
    this.setState({media_Source: event.target.value})
  }

  submitting = (e) => {
    e.preventDefault()
    this.datacall()
  }

  searching_change=(event)=>{
    this.setState({dashboard: event.target.value})
  }


  searching_submitting =(e)=>{
    e.preventDefault()
    this.datacall()

  }

  logout= () => {
    console.log("loggedout");
    localStorage.removeItem("id_token");
    this.props.history.push("/login")
  }


  render(){
    const {Day, Month, Year} = this.state;
    const options =  {
      title: {
        text: ""
      },
      chart: {
      panning: true,
      type: 'spline',
      // here for scrolling
      scrollablePlotArea: {
      minWidth: 1200,
      scrollPositionX: 1
      }
      },
      mapNavigation: {
      enabled: true,
      enableButtons: false
      },

      yAxis: {
         title: false
      },

      xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
            day:"%Y-%m-%d",
        },
      },
      series: [
      {
        showInLegend: false,
        name: 'ADS_FIVE_WATCHED',
        data: this.state.info.map((date)=>{
          return(
              date.ADS_FIVE_WATCHED)
            }),
            pointStart: Date.UTC(Year,Month,Day),
            pointEnd: Date.UTC(Year,Month,16),
            pointInterval: 24 * 3600 * 1000 // one day
          // every point in the data will be distributed every one day
      },
      {
        showInLegend: false,
        name: 'ADS_VIDEOAD_WATCHED',
        data: this.state.info.map((date)=>{
          return(
              date.ADS_VIDEOAD_WATCHED)
            }),
        pointStart: Date.UTC(Year,Month,Day),
        pointEnd: Date.UTC(Year,Month,16),
        pointInterval: 24 * 3600 * 1000 // one day
      },
      {
        showInLegend: false,
        name: 'ADD_FRIEND_REQUESTS',
        data: this.state.info.map((date)=>{
          return(
              date.Add_Friend_Request)
            }),
        pointStart: Date.UTC(Year,Month,Day),
        pointEnd: Date.UTC(Year,Month,16),
        pointInterval: 24 * 3600 * 1000
       },

        ],
        credits: {
          enabled: false
        }
       }
    return(
      <div>
        { this.state.logged_in ?
          <div className='container'>
          <div id='list'>
            <div className='dash_list'>
              <div className='dash_list-cabin'> Cabin</div>
                  <ul>
                    <li> <button onClick={this.dash1}> Untitled </button> </li>
                    <li> <button onClick={this.dash2}> Sample1 </button> </li>
                    <li> <button onClick={this.dash3}> ReportUAC </button> </li>
                    <li> <button onClick={this.dash4}> Default3 </button> </li>
                  </ul>
              </div>
           </div>
        <div className='secpage'>
            <div className='secpage-bar'>
              <ul>
                  <li> {this.state.dashboard_name} </li>
                  <li> 2019-06-12<i className='slash'> - </i>2019-06-18 </li>
                  <li> <button onClick={this.logout}> Logout </button>  </li>
              </ul>
            </div>

        <div className='secpage-dashboard'>
           <HighchartsReact
             highcharts={Highcharts}
             options={options}
           />
       </div>

          <div >
          <table className='dashboard_table'>
            <tr>
              <th> Channel</th>
              <th> Date</th>
              <th> Media Source</th>
              <th> ADS_FIVE_WATCHED</th>
              <th> ADS_VIDEOAD_WATCHED</th>
              <th> ADD_FRIEND_REQUESTS</th>
            </tr>
            {this.state.info.map((res)=>{return(
              <tr key={res.id}>
                <td> {res.Channel} </td>
                <td> {res.Date} </td>
                <td> {res.Media_Source} </td>
                <td> {res.ADS_FIVE_WATCHED} </td>
                <td> {res.ADS_VIDEOAD_WATCHED} </td>
                <td> {res.Add_Friend_Request} </td>
              </tr>
            )})}
          </table>
          </div>
          <div className='calender'>
              <DateRangePicker  onApply={this.onApplying}
                singleDatePicker
                minDate= '11/12/2019'
                maxDate= '11/14/2019'
                >
                  <button>
                      click to open
                  </button>
              </DateRangePicker>
          </div>
          <div>
            <form className='media_filter' onSubmit={this.submitting}>
              <input name='media_Source'
                     onChange={this.media_filter}
                     placeholder="Example: google"
                     value={this.state.media_Source}
                     />
              <input type='submit'  value="OK"/>
            </form>

            <form className='searching' onSubmit={this.searching_submitting}>
                <input name='searching'
                       onChange={this.searching_change}
                       placeholder="Example: Untitled"
                       />
                <input type='submit'  value="OK" />
            </form>
          </div>
        </div>
      </div>
        :
      <div className='Login'> Please <a href="/login"> login </a> first </div> }
      </div>
    )
  }
}
