(this.webpackJsonp=this.webpackJsonp||[]).push([[0],{160:function(e,t,a){e.exports=a.p+"static/media/golf2.4e67ef83.png"},161:function(e,t,a){e.exports=a.p+"static/media/golfBall.4daa5f5c.svg"},166:function(e,t,a){e.exports=a(243)},243:function(e,t,a){"use strict";a.r(t);var n=a(261),o=a(11),r=a.n(o),s=a(15),i=a.n(s),l=a(12),c=a.n(l),u=a(13),d=a.n(u),m=a(6),p=a.n(m),f=a(163),y=a(0),g=a.n(y),h="egn8TUBL3YWjTQRRR-_SpODJ1d1SW7JKggGx49iBT3sX7lAFxEMxJXpcUnTDnvoxL7M481VWXsvbSW1yAe6yZcBYwadHem2Uu-kGOZsfAC71fy3PkgTSlAc3RT9MYHYx",b="166a433c57516f51dfab1f7edaed8413",w=a(55),C=a.n(w),E=a(162),x=a(64),v=a(5),L=a(69),R=a(1),S=a(7),A=a(3),k=a(16),B=a(22),j=a(44),_=a(73),W=a(160),T=a.n(W),O=a(161),z=a.n(O);function I(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=p()(e);if(t){var o=p()(this).constructor;a=Reflect.construct(n,arguments,o)}else a=n.apply(this,arguments);return d()(this,a)}}var P=function(e){c()(a,e);var t=I(a);function a(){var e;r()(this,a);for(var n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return(e=t.call.apply(t,[this].concat(o))).state={myLat:"",myLon:"",city:"",state:"",zip:"",weatherDescription:"",futureWeather:"",temp:"",humidity:"",windSpeed:"",placesToGolf:[],platform:""},e.getForeCast=function(t){if(t.preventDefault(),"undefined"!==e.state.myLat){var a="https://api.openweathermap.org/data/2.5/onecall?lat="+e.state.myLat+"&lon="+e.state.myLon+"&units=imperial&exclude=minutely,alerts&appid="+b;C.a.get(a).then((function(t){return e.setState({temp:t.data.current.temp+"\xb0 Fehrenheit",humidity:t.data.current.humidity+"%",weatherDescription:t.data.current.weather[0].description.toUpperCase(),windSpeed:t.data.current.wind_speed+"/mph",futureWeather:t.data.daily[0].weather[0].description.toUpperCase()}),C.a.get(a)})).catch((function(e){console.log(e)}));var n="https://maps.googleapis.com/maps/api/geocode/json?latlng="+e.state.myLat+","+e.state.myLon+"&key=AIzaSyCANJ80ZERHp5HlMHbV1la0mQ5l7_a7DaI";C.a.get(n).then((function(t){return e.setState({city:t.data.results[0].address_components[2].long_name,state:t.data.results[0].address_components[4].short_name,zip:t.data.results[0].address_components[6].long_name}),C.a.get(n)})).catch((function(e){console.log(e)}))}else console.log("Something Went Wrong?");return C.a.get("https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search",{headers:{Authorization:"Bearer "+h},params:{term:"golf",categories:"golf",limit:50,radius:4e4,sort_by:"distance",latitude:e.state.myLat,longitude:e.state.myLon}}).then((function(t){console.log(e.state.myLat),console.log(e.state.myLon),console.log("businesses"),console.log(t.data.businesses[0]),e.setState({placesToGolf:t.data.businesses})})).catch((function(e){console.log(e)}))},e}return i()(a,[{key:"componentDidMount",value:function(){var e=this;this.setState({platform:v.a.OS}),navigator.geolocation.getCurrentPosition((function(t){var a=t.coords;e.setState({myLat:a.latitude}),e.setState({myLon:a.longitude})}),(function(e){return E.a.alert("Please Enable Your GPS. Error Message: "+e.message+"Error Code: "+e.code)}),{enableHighAccuracy:!0,timeout:5e3,maximumAge:1e5})}},{key:"componentDidUpdate",value:function(){}},{key:"render",value:function(){var e=this;return g.a.createElement(g.a.Fragment,null,g.a.createElement(L.a,{style:D.safeArea},g.a.createElement(f.a,{style:"auto"}),g.a.createElement(A.a,{style:D.container},g.a.createElement(j.a,{source:T.a,style:D.backgroungImg,imageStyle:{resizeMode:"repeat"}},g.a.createElement(A.a,{style:D.logoContainer},g.a.createElement(B.a,{source:z.a,style:D.logo,alt:"Logo"})),g.a.createElement(k.a,{style:D.touchableOpacityButton,onPress:this.getForeCast},g.a.createElement(S.a,{style:D.forecastButton},"Fore-Cast")),g.a.createElement(S.a,{style:D.view},"Temp: ",this.state.temp),g.a.createElement(S.a,{style:D.view},"Humidity: ",this.state.humidity),g.a.createElement(S.a,{style:D.view},"Wind Speed: ",this.state.windSpeed),g.a.createElement(S.a,{style:D.view},"Current Forecast: ",this.state.weatherDescription),g.a.createElement(S.a,{style:D.view},"Afternoon Forecast: ",this.state.futureWeather),g.a.createElement(S.a,{style:D.view},"Your Location:"," "+this.state.city+" "+this.state.state+" "+this.state.zip),g.a.createElement(A.a,{style:{width:"100%",borderBottomColor:"black",borderBottomWidth:1,textAlign:"center",justifyContent:"center"}}),g.a.createElement(S.a,{style:D.view},"Golf Results Closest To You:"),g.a.createElement(A.a,{style:{width:"100%",borderBottomColor:"black",borderBottomWidth:1,textAlign:"center",justifyContent:"center",borderRadius:20}}),g.a.createElement(A.a,{style:{borderRadius:20}},this.state.placesToGolf.filter((function(e){return e})).map((function(t){return g.a.createElement(A.a,{style:{borderRadius:20},key:t.id},g.a.createElement(_.a,{style:D.filteredCard},g.a.createElement(_.a.Title,{style:D.welcome},t.name),g.a.createElement(A.a,{style:{height:"20px"}}),g.a.createElement(k.a,{onPress:function(){e.state.platform,x.a.openURL("tel:"+t.display_phone)},style:D.touchableOpacityPhone},g.a.createElement(S.a,{style:D.welcome},t.display_phone)),g.a.createElement(A.a,{style:{height:"20px"}}),g.a.createElement(k.a,{style:D.touchableOpacityCard,onPress:function(){var a=t.location.display_address[0],n=t.location.display_address[1];e.state.platform,x.a.openURL("https://www.google.com/maps/dir/"+e.state.myLat+","+e.state.myLon+"/"+a+n)}},g.a.createElement(S.a,{style:D.welcome},t.location.display_address[0]),g.a.createElement(S.a,{style:D.welcome},t.location.display_address[1]),g.a.createElement(S.a,{style:D.welcome},t.location.display_address[2]),g.a.createElement(A.a,{style:{height:"20px"}})),g.a.createElement(S.a,{style:D.welcome},"Yelp Rating:"),g.a.createElement(A.a,{style:{height:"10px"}}),g.a.createElement(_.b,{type:"star",ratingCount:5,showReadOnlyText:!0,readonly:!0,startingValue:t.rating}),g.a.createElement(A.a,{style:{height:"20px"}})))})))))))}}]),a}(y.Component),D=R.a.create({safeArea:{height:"100%"},container:{flex:1,backgroundColor:"#fff",alignItems:"center",justifyContent:"center"},logoContainer:{alignItems:"center",justifyContent:"center",paddingBottom:"50px",paddingTop:"50px"},touchableOpacityCard:{alignItems:"center",justifyContent:"center",width:"80%",height:"auto",marginLeft:"10%",paddingTop:"10px",backgroundColor:"#009688",borderRadius:10},touchableOpacityPhone:{alignItems:"center",justifyContent:"center",width:"80%",height:"auto",marginLeft:"10%",paddingBottom:"8px",backgroundColor:"#009688",borderRadius:10},touchableOpacityButton:{alignItems:"center",justifyContent:"center",width:"50%",height:"50px",marginLeft:"25%",marginBottom:"20px",backgroundColor:"#009688",borderRadius:10},forecastButton:{fontSize:20,fontWeight:"bold",textAlign:"center",justifyContent:"center"},welcome:{fontSize:20,fontWeight:"bold",textAlign:"center",justifyContent:"center"},view:{fontSize:20,fontWeight:"bold",textAlign:"center",justifyContent:"center",backgroundColor:"#ffffff",paddingBottom:"10px"},filteredCard:{alignItems:"center",justifyContent:"center",borderRadius:20},title:{fontSize:20,fontWeight:"bold",textAlign:"center",justifyContent:"center"},backgroungImg:{textAlign:"center",height:"100%",width:"100%",justifyContent:"center"},logo:{textAlign:"center",height:"200px",width:"200px",justifyContent:"center",backgroundColor:"#ffffff",borderRadius:100}});Object(n.a)(P)}},[[166,1,2]]]);
//# sourceMappingURL=app.f23c39a9.chunk.js.map