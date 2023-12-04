const printOneDayData = document.getElementById('oneDay');
const printmultiDayData = document.getElementById('multiDay');
const searchForm = document.getElementById('searchForm');
const printAllDayData = document.getElementById('mAll');
const mobilePrintOneDayData = document.getElementById('mOneDay');
const mobilePrintMultiDayData = document.getElementById('mMultiDay');
const searchFormMobile = document.getElementById('mobileSearchForm');

const UrlParams = new URLSearchParams(window.location.search);
const nowDate = new Date();
const currentDateString = nowDate.toLocaleDateString();
const currentDateMoment = moment().format("YYYY-MM-DD")
const currentDate = moment(currentDateMoment).format('x')
// const currentDate = moment(currentDateFormat).format('x')

const firstDay = new Date(nowDate.getFullYear(), nowDate.getMonth(), 1);
const lastDay = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 0);

let nowDateString = moment(firstDay).format("YYYY-MM-DD");
console.log(nowDateString)
nowDateString = nowDateString +'T00:00:00.000Z';
// let utcTime = moment.utc(nowDateString)
const lastDateString = moment(lastDay).format("MM/DD/YY");
const todayDate = moment(nowDateString).format('x');
const lastDateOfMonth = moment(lastDateString).format('x');
console.log("todayDate", todayDate)
let objData = { 
   "date": todayDate,
   "filter": "All",
   "type": "All",
   "search": ""
};
// =========================== Datepicker =======================================
let datePickerDesktop = $("#datepicker").datepicker( {
   format: "mm-yyyy",
   startView: "months", 
   minViewMode: "months"
});
let datePickerMobile = $("#datepickerMobile").datepicker( {
   format: "mm-yyyy",
   startView: "months", 
   minViewMode: "months"
});


// =========================== Method for check parameters =================================
function setVariables(){
   if (history.pushState) {
	  var dateValue = datePickerDesktop.datepicker("getDate");
	  var conDate = new Date(dateValue.getFullYear(), dateValue.getMonth(), 1)

	  $('.top-cont .date').text(conDate.toLocaleString('default', { month: 'short' }) +", "+ conDate.getFullYear()  )
	  var dateVale = moment(conDate).format("YYYY-MM-DD");
	  dateVale = dateVale +'T00:00:00.000Z';
	  var date = moment(dateVale).format('x');
	  console.log("nunix ", dateVale)
	  console.log(" unix ", date)

	  let filterArray = [];
	  let typeArray = [];
	  let filter;
	  let type;

	  $('.sportsFilters button').each(function(){
		 if($(this).hasClass('active')){
			filterArray.push($(this).val())
		 }
	  })
	  if( filterArray.length > 0 ){
		 filter = filterArray 
	  } else {
		 filter = 'All';
	  }

	  var html = "";  
	  for(var i in filterArray){
		 html += '<span>'+filterArray[i]+'</span>';
	  }
	  var htmlType = "";  
	  for(var i in typeArray){
		 htmlType += '<span>'+typeArray[i]+'</span>';
	  }

	  $('.typeFilters button').each(function(){
		 if($(this).hasClass('active')){
			typeArray.push($(this).val())
		 }
	  })
	  if( typeArray.length > 0 ){
		 type = typeArray 
	  } else {
		 type = 'All';
	  }
	  var search = $('#searchInput').val() || 'All';

	  if(filter == "All"){
		 $('.top-cont .filter').html("")
	  } else {
		 $('.top-cont .filter').html(html)
	  }

	  $('.top-cont .type').text(" | "+" "+type)

	  var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?date='+date+'&filter='+ filter +'&type='+ type +'&s=' + search 
	  window.history.pushState({path:newurl},'',newurl);
   }
}


function setVariablesMobile(){
   if (history.pushState) {
	  var dateValue = datePickerMobile.datepicker("getDate");
	  var conDate = new Date(dateValue.getFullYear(), dateValue.getMonth(), 1)
	  $('.top-cont .date').text(conDate.toLocaleString('default', { month: 'short' }) +", "+ conDate.getFullYear()  )
	  var dateVale = moment(conDate).format("YYYY-MM-DD");
	  dateVale = dateVale +'T00:00:00.000Z';

	  var date = moment(dateVale).format('x');
      

	  let filterArray = [];
	  let typeArray = [];
	  let filter;
	  let type;

	  $('.sportsFilters button').each(function(){
		 if($(this).hasClass('active')){
			filterArray.push($(this).val())
		 }
	  })
	  if( filterArray.length > 0 ){
		 filter = filterArray 
	  } else {
		 filter = 'All';
	  }

	  var html = "";  
	  for(var i in filterArray){
		 html += '<span>'+filterArray[i]+'</span>';
	  }
	  var htmlType = "";  
	  for(var i in typeArray){
		 htmlType += '<span>'+typeArray[i]+'</span>';
	  }
	  $('.typeFilters button').each(function(){
		 if($(this).hasClass('active')){
			typeArray.push($(this).val())
		 }
	  })
	  if( typeArray.length > 0 ){
		 type = typeArray 
	  } else {
		 type = 'All';
	  }
	  var search = $('#searchInput').val() || 'All';

	  if(filter == "All"){
		 $('.top-cont .filter').html("")
	  } else {
		 $('.top-cont .filter').html(html)
	  }
	  $('.top-cont .type').text(" | "+" "+type)
	  var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?date='+date+'&filter='+ filter +'&type='+ type +'&s=' + search 
	  window.history.pushState({path:newurl},'',newurl);
   }
}
// =========================== End Method for check parameters =================================
function callAPI(){
   var URL = "/_hcms/api/dateTestEvent";
   var urlParams = new URLSearchParams(window.location.search);
   if(true){
	  var dateValue = urlParams.get('date') || todayDate;
	  var filter = urlParams.get('filter') || 'All';;
	  var type = urlParams.get('type') || 'All';
	  var search = urlParams.get('s') || 'All';
	  objData.date = dateValue;
	  objData.filter = filter;
	  objData.type = type;
	  if(search !== "All"){
		 objData.search = search;
	  }
	  const config = {
		 url : URL,
		 method: "post",
		 headers: {
			'Content-Type': 'application/json'
		 },
		 data : objData
	  }
	  axios(config).then(res => {
		 printOneDayData.innerHTML = " " ;
		 if(printAllDayData){
			printAllDayData.innerHTML = " " ;
		 }
		 const responsData = res.data;
		 //            const results = responsData.sort(function(a,b){
		 //               let first = a.properties.start_date
		 //               let second = b.properties.start_date

		 //               return new Date(second) - new Date(first);
		 //            });
		 console.log(responsData)
		 output(responsData);

	  }).catch( err => console.log(err))
   }

}
function clearCallAPI(){
   var URL = "/_hcms/api/dateTestEvent";
   var urlParams = new URLSearchParams(window.location.search);
   if(true){
	  var dateValue = urlParams.get('date') || todayDate;
	  var filter = urlParams.get('filter') || 'All';;
	  var type = urlParams.get('type') || 'All';
	  var search = urlParams.get('s') || 'All';
	  objData.date = dateValue;
	  if(filter == "All"){
		 objData.filter = 'All';
	  }
	  if(type == "All"){
		 objData.type = 'All';
	  }
	  if(search == "All"){
		 objData.search = 'All';
	  }
	  const config = {
		 url : URL,
		 method: "post",
		 headers: {
			'Content-Type': 'application/json'
		 },
		 data : objData
	  }
	  axios(config).then(res => {
		 printOneDayData.innerHTML = " " ;
		 if(printAllDayData){
			printAllDayData.innerHTML = " " ;
		 }
		 const responsData = res.data
		 //            const results = responsData.sort(function(a,b){
		 //               let first = a.properties.start_date
		 //               let second = b.properties.start_date
		 //               return new Date(second) - new Date(first);
		 //            });
		 output(responsData);
	  }).catch( err => console.log(err))
   }

}



// ========================= Method for output =====================================
function output(data){
   if(data.length > 0 ){
	  data.forEach(function(item){
		 const pro = item.properties;
		 const sDateFormat = new Date(pro.start_date).toLocaleDateString();
		 const eDateFormat = new Date(pro.end_date).toLocaleDateString();
		 const sDateValue = moment(sDateFormat).format("MM/DD/YY");
		 const eDateValue = moment(eDateFormat).format("MM/DD/YY");
		 const sDate = moment(sDateValue).format('x');
		 const eDate = moment(eDateValue).format('x');

		 var data = dataGet(pro);
		 var data2 = mobiledataGet(pro);
		 var allDate = mobiledataGet(pro);

		 var allDataDive = document.createElement('div');
		 allDataDive.setAttribute('class', 'outerDiv');
		 allDataDive.innerHTML += allDate
		 printAllDayData.appendChild(allDataDive)

		 //          if( sDate === eDate ){
		 var outerDiv = document.createElement('div');
		 outerDiv.setAttribute('class', 'outerDiv');
		 outerDiv.innerHTML += data
		 printOneDayData.appendChild(outerDiv)

	  })
	  $('.p-title').show();
	  if( $('#multiDay').text() == " " ) {
		 $('#multiDay').prev().hide()
	  }
	  if( $('#oneDay').text() == " " ) {
		 $('#oneDay').prev().hide()
	  }

   } else {
	  printOneDayData.innerHTML = "No Data found.";
	  $('.p-title').hide();
   }
}



function dataGet(ele){
   var out = "";
   function convertTZ(date, tzString) {
	  return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
   }
   let sDateToString = new Date(ele.start_date)
   let eDateToString = new Date(ele.end_date)

   sDateToString = convertTZ(sDateToString, "Asia/Singapore") 
   eDateToString = convertTZ(eDateToString, "Asia/Singapore") 

   let sMonthName = moment(sDateToString).format('MMM')
   let sDateDigit = moment(sDateToString).format('DD')
   let eMonthName = moment(eDateToString).format('MMM')
   let eDateDigit = moment(eDateToString).format('DD')
   const sDate = moment(sDateToString).format('x');
   const eDate = moment(eDateToString).format('x');
   let noImg = "";

   if( sDate === eDate ){
	  if(eDate == currentDate){
		 out = out + '<div class="cal_item-row on-going">';
	  } else if(eDate < currentDate){
		 out = out + '<div class="cal_item-row">';
	  } else {
		 out = out + '<div class="cal_item-row up-coming">';
	  }
   }  else {
	  if( eDate < currentDate ){
		 out = out + '<div class="cal_item-row">';
	  }
	  if( sDate > currentDate ){
		 out = out + '<div class="cal_item-row up-coming">';
	  }
	  if(currentDate >= sDate && currentDate <= eDate){
		 out = out + '<div class="cal_item-row on-going">';
	  }
   }



   out = out + '<div class="item-inner row-flex">';

   if(ele.thumbnail_image) {
	  out = out + '<div class="img"><img src="'+ ele.thumbnail_image +'" alt="'+ ele.event_title +'" height="200" width="200"></div>'    
   } else {
	  noImg = "noImage"
   }

   out = out + '<div class="cal-wrap row-flex align-center '+ noImg+'">'

   if(sDate === eDate ){


	  if(eDate == currentDate){
		 out = out + '<div class="left on-going">'
	  } else if(eDate < currentDate){
		 out = out + '<div class="left past">'
	  } else {
		 out = out + '<div class="left up-coming">'
	  }

	  out = out + '<div class="date-day"><span class="date">'+ sDateDigit +'</span> <span class="day">'+  sMonthName +'</span></div>';
	  if(ele.start_time){
		 out = out + '<div class="time">'
		 out = out + '<span>'+ ele.start_time+'</span>'
		 if(ele.end_time ) {
			out = out + '<span> - '+ ele.end_time+'</span>'
		 }
		 out = out + '</div>'
	  }
	  out = out + '</div>'
   } else {


	  if( eDate < currentDate ){
		 out = out + '<div class="left row-flex align-center date-wrap no-cuurent">'
		 out = out + '<div class="d-wrap">'
		 out = out + '<div class="sDate"><div class="txt">Start</div><div class="round border"><div class="b-date"><b>'+ sDateDigit +'</b><br>'+sMonthName +'</div></div></div>'
		 out = out + '<div class="eDate"><div class="txt">End</div><div class="round"><div class="b-date"><b>'+ eDateDigit +'</b><br>'+ eMonthName+'</div></div></div>'
		 out = out + '</div>';
		 if(ele.start_time){
			out = out + '<div class="time">'
			out = out + '<span>'+ ele.start_time+'</span>'
			if(ele.end_time ) {
			   out = out + '<span> - '+ ele.end_time+'</span>'
			}
			out = out + '</div>'
		 }
		 out = out + '</div>';
	  }else if( sDate < currentDate ){
		 out = out + '<div class="left row-flex align-center date-wrap up-coming">'
		 out = out + '<div class="d-wrap">'
		 out = out + '<div class="sDate"><div class="txt">Start</div><div class="round border"></div><div class="b-date">'+ sDateDigit +'<br>'+ sMonthName  +'</div></div>'
		 out = out + '<div class="date-day"><span class="date">'+ nowDate.getDate() +'</span><span class="day">'+ nowDate.toLocaleString('default', { month: 'short' })+'</span></div>'
		 out = out + '<div class="eDate"><div class="txt">End</div><div class="round"></div><div class="b-date">'+ eDateDigit +'<br>'+ eMonthName  +'</div></div>'
		 out = out + '</div>';
		 if(ele.start_time){
			out = out + '<div class="time">'
			out = out + '<span>'+ ele.start_time+'</span>'
			if(ele.end_time ) {
			   out = out + '<span> - '+ ele.end_time+'</span>'
			}
			out = out + '</div>'
		 }
		 out = out + '</div>';
	  } else {
		 var cuurent = "";
		 if(sDate == todayDate){
			cuurent = "sCurrent"
		 }
		 if(eDate == todayDate){
			cuurent = "eCurrent"
		 }
		 out = out + '<div class="left row-flex align-center date-wrap no-cuurent '+ cuurent +'">'
		 out = out + '<div class="d-wrap">'
		 out = out + '<div class="sDate"><div class="txt">Start</div><div class="round border"><div class="b-date"><b>'+ sDateDigit +'</b><br>'+ sMonthName +'</div></div></div>'
		 out = out + '<div class="eDate"><div class="txt">End</div><div class="round"><div class="b-date"><b>'+ eDateDigit +'</b><br>'+ eMonthName +'</div></div></div>'
		 out = out + '</div>';
		 if(ele.start_time){
			out = out + '<div class="time">'
			out = out + '<span>'+ ele.start_time +'</span>'
			if(ele.end_time){
			   out = out + ' - <span>'+ ele.end_time +'</span>'
			}
			out = out + '</div>'
		 }
		 out = out + '</div>';
	  }
   }
   out = out + '<div class="right">'
   if( eDate ){

   }
   if( sDate === eDate ){
	  if(eDate == currentDate){
		 out = out + '<div class="going">ON-GOING<span style="display:none">'+ eDate+'<span></div>'; 
	  } else if(eDate < currentDate){
		 out = out + '<div class="past">PAST<span style="display:none">'+ eDate+'<span></div>'; 
	  } else {
		 out = out + '<div class="up-coming">UP-Coming<span style="display:none">'+ eDate+'<span></div>'; 
	  }
   } else {
	  if( eDate < currentDate ){
		 out = out + '<div class="past">PAST</div>'; 
	  }
	  if( sDate > currentDate ){
		 out = out + '<div class="up-coming">UP-Coming</div>'; 
	  }
	  if(currentDate >= sDate && currentDate <= eDate){
		 out = out + '<div class="going">ON-GOING</div>'; 
	  }
   }




   out = out + '<div><a class="read-more" href="/event-test/'+ ele.event_path +'">MORE INFO</a></div>'

   out = out + '</div>';
   out = out + '<div class="middle">'
   if(ele.filter_type){
	  out = out + '<div class="filter">'
	  out = out + '<span>'+ ele.filter_type +'</span>'
	  out = out + '</div>'
   }
   out = out + '<div class="cal-title">'+ ele.event_title +'</div>'
   if(ele.venue){
	  out = out + '<div class="venue"><img src="https://6212555.fs1.hubspotusercontent-na1.net/hubfs/6212555/ActiveSG%20Circle/Circle%202.0/loc.svg" alt="venue" width="9" height="9"><span>'+ ele.venue +'</span></div>'
   }

   out = out + '</div>'

   if(ele.description_short){ 
	  var str = ele.description_short.replace(/<(.|\n)*?>/g, '');;
	  out = out + '<div class="desc">'+ str.slice(0, 90)+'...'; +'</div>' 
   }
   out = out + '</div>';
   out = out + '</div>';
   out = out + '</div>'
   return out;
}


function mobiledataGet(ele){
   var mout = "";
   const sDateValue = new Date(ele.start_date);
   const eDateValue = new Date(ele.end_date);
   const sDateToString = moment(sDateValue).format("MM/DD/YY");
   const eDateToString = moment(eDateValue).format("MM/DD/YY");
   const sDate = moment(sDateToString).format('x');
   const eDate = moment(eDateToString).format('x');

   mout = mout + '<a href="/event-test/'+ ele.event_path+'">'

   if( sDate === eDate ){
	  if(eDate == currentDate){
		 mout = mout + '<div class="mobile-row on-going row-flex justify-bw">';
	  } else if(eDate < currentDate){
		 mout = mout + '<div class="mobile-row past-item row-flex justify-bw">';
	  } else {
		 mout = mout + '<div class="mobile-row up-coming row-flex justify-bw">';
	  }
   }  else {
	  if( eDate < currentDate ){
		 mout = mout + '<div class="mobile-row past-item row-flex justify-bw">';
	  }
	  if( sDate > currentDate ){
		 mout = mout + '<div class="mobile-row up-coming row-flex justify-bw">';
	  }
	  if(currentDate >= sDate && currentDate <= eDate){
		 mout = mout + '<div class="mobile-row on-going row-flex justify-bw">';
	  }
   }

   if(sDate === eDate ){
	  mout = mout + '<div class="mdate-wrap"><div class="msDate"><b>'+ sDateValue.getDate()+'</b>'+ sDateValue.toLocaleString('default', { month: 'short' }) +'</div></div>';
   } else {
	  mout = mout + '<div class="mdate-wrap"><div class="msDate"><b>'+ sDateValue.getDate()+'</b>'+ sDateValue.toLocaleString('default', { month: 'short' }) +'</div>';
	  mout = mout + '<div class="border"></div>'
	  mout = mout + '<div class="meDate"><b>'+ eDateValue.getDate()+'</b>'+ eDateValue.toLocaleString('default', { month: 'short' }) +'</div>'
	  mout = mout + '</div>'
   }
   mout = mout + '<div class="item-inner row-flex">';

   if(ele.thumbnail_image) {
	  mout = mout + '<div class="img row-flex"><img src="'+ ele.thumbnail_image +'" alt="'+ ele.event_title +'"></div>'    
   }

   mout = mout + '<div class="cal-wrap row-flex align-center">'

   //    
   mout = mout + '<div class="middle">'
   mout = mout + '<div class="filter-wraper row-flex justify-bw align-center">'
   if(ele.filter_type){
	  mout = mout + '<div class="filter">'
	  mout = mout + '<span>'+ ele.filter_type +'</span>'
	  mout = mout + '</div>'
   }
   /* if( sDate === eDate ){
        if(eDate == currentDate){
            mout = mout + '<div class="going">ON-GOING</div>'; 
        } else if(eDate < currentDate){
            mout = mout + '<div class="past">PAST</div>'; 
        } else {
            mout = mout + '<div class="up-coming">UP-Coming</div>'; 
        }
    } else {
        if( eDate < currentDate ){
            mout = mout + '<div class="past">PAST</div>'; 
        }
        if( sDate > currentDate ){
            mout = mout + '<div class="up-coming">UP-Coming</div>'; 
        }
        if(currentDate >= sDate && currentDate <= eDate){
            mout = mout + '<div class="going">ON-GOING</div>'; 
        }
    }*/

   mout = mout + '</div><div class="cal-title">'+ ele.event_title +'</div>'
   if(ele.venue){
	  //         mout = mout + '<div class="venue"><img src="https://6212555.fs1.hubspotusercontent-na1.net/hubfs/6212555/ActiveSG%20Circle/Circle%202.0/loc.svg" alt="venue"><span>'+ ele.venue +'</span></div>'
   }
   if(ele.start_time){
	  //         mout = mout + '<div class="time"> <img src="https://6212555.fs1.hubspotusercontent-na1.net/hubfs/6212555/Circle%202.0%20Refresh/time.png" alt="Time"> '+ ele.start_time +'</div>'
   }
   if(ele.description_short){
	  var str = ele.description_short.replace(/<(.|\n)*?>/g, '');;
	  //         mout = mout + '<div class="desc">'+ str.slice(0, 90)+'...'; +'</div>' 
   }
   mout = mout + '</div>'
   mout = mout + '</div>';
   mout = mout + '</div>';
   mout = mout + '</div>';
   mout = mout + '</div></a>'
   return mout;
}




// ========================= End Method for output =====================================
// ========================= Sidebar Toggle method =====================================
$('.togglePanel h3').click(function(){
   $(this).parent().toggleClass('active');
   $(this).next().slideToggle();
})

// ===================== Ready Calling =====================================
$(document).ready(function(){
   let cuDate = new Date();
   $('.top-cont .date').text(cuDate.toLocaleString('default', { month: 'short' }) +", "+ cuDate.getFullYear()  )
   callAPI();
})
// ===================== Method Calling Desktop =====================================

datePickerDesktop.on('changeDate', function (e) { 

   var m = e.date.getMonth()
   var m2 = e.date.getMonth() + 1;
   var month = ("0" + m).slice(-2);
   var day = 1;
   var Year = String(e.date).split(" ")[3];
   var set_date = m2+'/'+day+'/'+Year;



   datePickerMobile.datepicker('update', new Date(set_date));
   $('.date-picker-carousel').slick('slickGoTo', month);
   setVariables();
   callAPI();    
});
$('#type button').on('click', function(){
   if($(this).hasClass('allButton')){
	  $(this).siblings().removeClass('active')
	  $(this).addClass('active');
   } else {
	  $(this).siblings(":first").removeClass('active')
	  $(this).toggleClass('active');
   }
   setVariables();
   callAPI();    
})
$('#filter button').on('click', function(){
   if($(this).hasClass('allButton')){
	  $(this).siblings().removeClass('active')
	  $(this).addClass('active');
   } else {
	  $(this).siblings(":first").removeClass('active')
	  $(this).toggleClass('active');
   }
   setVariables();
   callAPI();    
})
searchForm.addEventListener('submit', function(e){
   e.preventDefault();
   setVariables();
   callAPI();   
   console.log("api Call")
})
$('#searchInput').keydown(function(e) {
   if (e.keyCode == 13) {
	  $('#searchForm').submit(function(e){
		 e.preventDefault();
		 setVariables();
		 callAPI();   
		 console.log("api Call enter")
	  });
   }
});
$('#msearchInput').keydown(function(e) {
   if (e.keyCode == 13) {
	  $('#mobileSearchForm').submit(function(e){
		 e.preventDefault();
		 setVariables();
		 callAPI();   
	  });
   }
});
// ===================== Method Calling Mobile =====================================



// ===================== Slider Calling Mobile =====================================
const currentMonth = new Date().getMonth();
$('.date-picker-carousel').slick({
   slidesToShow: 7,
   slidesToScroll: 1,
   focusOnSelect: true,
   infinite: true,
   arrows: false,
   centerMode:false,
   responsive: [
	  {
		 breakpoint: 600,
		 settings: {
			slidesToShow: 4,
			slidesToScroll: 1
		 }
	  },
	  {
		 breakpoint: 480,
		 settings: {
			slidesToShow: 4,
			slidesToScroll: 1
		 }
	  }
	  // You can unslick at a given breakpoint now by adding:
	  // settings: "unslick"
	  // instead of a settings object
   ]
});
$('.date-picker-carousel').slick('slickGoTo', currentMonth);
$('#datepickerSlider').datepicker({
   minViewMode: 2,
   format: 'yyyy',
});
$('#datepickerSlider').datepicker().on('changeYear', function(e) {
   let currYear = moment(e.date).format('YYYY')
   console.log(currYear)
   $('.dateWrapper .slick-slide').each(function(){
	  $(this).attr('yyyy', currYear)
   });
   $('.date-picker-carousel').slick('slickGoTo', 0);
   datePickerMobile.datepicker('update', new Date(e.date));
   datePickerDesktop.datepicker('update', new Date(e.date));
   
   
   $('.date-picker-carousel .date.slick-current').trigger('click', function(){
	  var d = 1;
	  var m = $(this).attr('mm');
	  var y = $(this).attr('yyyy');
	  var set_date = m+'/'+d+'/'+y;
	  datePickerMobile.datepicker('update', new Date(set_date));
	  datePickerDesktop.datepicker('update', new Date(set_date));
	  console.log("dfdfdf")
	  setVariablesMobile()
	  callAPI()
   });
}); 


$( ".date-picker-carousel .date" ).click(function(e) {
   $('.date-picker-carousel').slick('slickSetOption', 'slidesToScroll', 7);
   var d = 1;
   var m = $(this).attr('mm');
   var y = $(this).attr('yyyy');
   var set_date = m+'/'+d+'/'+y;
   datePickerMobile.datepicker('update', new Date(set_date));
   datePickerDesktop.datepicker('update', new Date(set_date));


   //    var tdd = 1654021800000;
   //    var td2 = 1654041600000
   //    console.log("firstf", moment(tdd).format('DD/MM/YYYY') )
   //    console.log("second", moment(td2).format('DD/MM/YYYY') )
   //     let filterArrayMobile = [];
   //     let filterMobile;
   //     $('#sportsList button').each(function(){
   //         if($(this).hasClass('active')){
   //             filterArrayMobile.push($(this).val())
   //         }
   //     })
   //     if( filterArrayMobile.length > 0 ){
   //         filterMobile = filterArrayMobile 
   //     } else {
   //         filterMobile = 'All';
   //     }
   //     var type = $('#filterType button.active').val() || 'All';
   //     var search = $('#msearchInput').val() || 'All';


   setVariablesMobile()

   //   date wise filter 
   //     if (history.pushState) {
   //         $('.current-filter-set p').html('Results from <span>'+moment(set_date).format('DD MMMM, YYYY')+'</span>');
   //         //       set_date = set_date +' 5:30:00 AM GMT+05:30';
   //         date = moment(set_date).format('x');
   //         var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?date='+date+'&filter='+ filter +'&type='+ type +'&s=' + search 
   //         window.history.pushState({path:newurl},'',newurl);

   //     }
   callAPI()
});
// ===================== Filter popup Mobile =====================================
$('.mFilter').click(function(){
   $('.filter-fixed-wrapper').addClass('active')
})
$('.backfilter').click(function(){
   $('.filter-fixed-wrapper').removeClass('active')
})

datePickerMobile.on('changeDate', function (e) {    

   console.log("cal slider m")
   
   var m = e.date.getMonth()
   var m2 = e.date.getMonth() + 1;
   var month = ("0" + m).slice(-2);
   var day = 1;
   var Year = String(e.date).split(" ")[3];
   var set_date = m2+'/'+day+'/'+Year;

   datePickerDesktop.datepicker('update', new Date(set_date));
   $('.date-picker-carousel').slick('slickGoTo', month);

   setVariablesMobile();
   callAPI();    
});
$('#sportsList button').on('click', function(){
   if($(this).hasClass('allButton')){
	  $(this).siblings().removeClass('active')
	  $(this).addClass('active');
   } else {
	  $(this).siblings(":first").removeClass('active')
	  $(this).toggleClass('active');
   }
   setVariablesMobile();
})
$('#filterType button').on('click', function(){
   if($(this).hasClass('allButton')){
	  $(this).siblings().removeClass('active')
	  $(this).addClass('active');
   } else {
	  $(this).siblings(":first").removeClass('active')
	  $(this).toggleClass('active');
   }
   setVariablesMobile();
})
$('#applyFilter').on('click', function(){
   $('.filter-fixed-wrapper').removeClass('active')
   let urlParams = new URLSearchParams(window.location.search);
   let fill = urlParams.get('filter')
   let type = urlParams.get('type')
   let sear = urlParams.get('s')
   if((fill == "All") && (type == "All") && (sear == "All")){
	  clearCallAPI();
	  console.log("cle")
   } else {
	  callAPI();
	  console.log("data")
   }


})
// ===================== Mobile searach =====================================
$('.mSearch').click(function(){
   $('.mobile-search').addClass('active')
})
searchFormMobile.addEventListener('submit', function(e){
   e.preventDefault();
   $('.mobile-search').removeClass('active')
   setVariablesMobile();
   callAPI();   
})
$('.mobile-search > button').click(function(){
   $('.mobile-search').removeClass('active')
})

$('#msearchInput').keyup(function (e) {
   if (e.which == 13) {
	  searchFormMobile.addEventListener('submit', function(e){
		 e.preventDefault();
		 $('.mobile-search').removeClass('active')
		 setVariablesMobile();
		 callAPI();   
	  })
	  return false;    //<---- Add this line
   }
});
// ===================== Clear filter Mobile =====================================
$('.clearFilter').on('click', function(){

   if (history.pushState) {
	  $('#sportsList button.active').removeClass("active");
	  $('#filterType button.active').removeClass('active');
	  datePickerDesktop.val("").datepicker("update");
	  datePickerMobile.val("").datepicker("update");
	  var filter = 'All';
	  var type = 'All';
	  var search = 'All';

	  var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?date='+todayDate+'&filter='+ filter +'&type='+ type +'&s=' + search 
	  window.history.pushState({path:newurl},'',newurl);
   }



   $('.side-row button').each(function(){
	  $(this).removeClass('active')
   })
   var dateValue = datePickerDesktop.datepicker("getDate");
   var conDate = new Date(dateValue)
   $('.top-cont .date').text(conDate.toLocaleString('default', { month: 'short' }) +", "+ conDate.getFullYear()  )
   $('.top-cont .filter').text("")
   $('.top-cont .type').text("")
   clearCallAPI();
})


function hsOnReadyLoadTabber() {
   // Variables  
   var i;
   var tabPane = document.getElementsByClassName("tab-pane-content");
   var tabAnchor = document.querySelectorAll(".tabber-list a");

   // Loop through all of the tab anchors
   for (i = 0; i < tabAnchor.length; i++) {

	  // Click function for when tab is clicked on
	  tabAnchor[i].addEventListener("click", function(e){
		 e.preventDefault();
		 var tabIsOpen = this.parentElement.classList.contains("active");
		 var tabPaneId = this.getAttribute("href").substring(1);
		 var activeTabPane = document.getElementById(tabPaneId);
		 // If the tab clicked is not already opened
		 if (tabIsOpen === false) {
			for (i = 0; i < tabAnchor.length; i++) {
			   // Removes active class on all tab anchors
			   tabAnchor[i].parentElement.classList.remove("active");
			}
			for (i = 0; i < tabPane.length; i++) {
			   // Removes active class on all tab panes
			   tabPane[i].classList.remove("active");
			}
			// Adds active class to the active tab pane and anchor
			this.parentElement.classList.add("active");
			activeTabPane.classList.add("active");
		 }
	  });  
   }
}

if (document.readyState === "complete" ||
	(document.readyState !== "loading" && !document.documentElement.doScroll)
   ) {
   hsOnReadyLoadTabber();
} else {
   document.addEventListener("DOMContentLoaded", hsOnReadyLoadTabber);
}
