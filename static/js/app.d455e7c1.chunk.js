(this.webpackJsonp=this.webpackJsonp||[]).push([[0],{106:function(e,t,a){"use strict";a.r(t);var n=a(110),o=a(23),r=a.n(o),s=a(24),i=a.n(s),l=a(25),c=a.n(l),m=a(26),u=a.n(m),d=a(15),p=a.n(d),y=a(73),f=a(0),g=a.n(f),h="AIzaSyA9C-teXa31caCvWVDudnqUX0Edr5otzzg",w="egn8TUBL3YWjTQRRR-_SpODJ1d1SW7JKggGx49iBT3sX7lAFxEMxJXpcUnTDnvoxL7M481VWXsvbSW1yAe6yZcBYwadHem2Uu-kGOZsfAC71fy3PkgTSlAc3RT9MYHYx",E="166a433c57516f51dfab1f7edaed8413",b=a(17),x=a.n(b),C=a(52),v=a(71),S=a(51),A=a(53),L=a(2),B=a(6),_=a(3),j=a(74),k=a(33),R=a(70),W=a(49),T=a.n(W),z=a(50),D=a.n(z);function F(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=p()(e);if(t){var o=p()(this).constructor;a=Reflect.construct(n,arguments,o)}else a=n.apply(this,arguments);return u()(this,a)}}var G=function(e){c()(a,e);var t=F(a);function a(){var e;r()(this,a);for(var n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return(e=t.call.apply(t,[this].concat(o))).state={myLat:"",myLon:"",city:"",state:"",zip:"",weatherDescription:"",temp:"",humidity:"",windSpeed:"",placesToGolf:[],platform:""},e.getForeCast=function(t){if(t.preventDefault(),"undefined"!==e.state.myLat){var a="https://api.openweathermap.org/data/2.5/onecall?lat="+e.state.myLat+"&lon="+e.state.myLon+"&units=imperial&exclude=minutely,alerts&appid="+E;x.a.get(a).then((function(t){return e.setState({temp:t.data.current.temp,humidity:t.data.current.humidity,weatherDescription:t.data.current.weather[0].description,windSpeed:t.data.current.wind_speed}),x.a.get(a)})).catch((function(e){console.log(e)}));var n="https://maps.googleapis.com/maps/api/geocode/json?latlng="+e.state.myLat+","+e.state.myLon+"&key="+h;x.a.get(n).then((function(t){return e.setState({city:t.data.results[0].address_components[2].long_name,state:t.data.results[0].address_components[4].short_name,zip:t.data.results[0].address_components[6].long_name}),x.a.get(n)})).catch((function(e){console.log(e)}))}else console.log("Something Went Wrong?");return x.a.get("https://cors.bridged.cc/https://api.yelp.com/v3/businesses/search",{headers:{Authorization:"Bearer "+w},params:{term:"golf",categories:"golf",limit:50,radius:4e4,sort_by:"distance",latitude:e.state.myLat,longitude:e.state.myLon}}).then((function(t){e.setState({placesToGolf:t.data.businesses})})).catch((function(e){console.log(e)}))},e}return i()(a,[{key:"componentDidMount",value:function(){var e=this;this.setState({platform:S.a.OS}),navigator.geolocation.getCurrentPosition((function(t){var a=t.coords;e.setState({myLat:a.latitude}),e.setState({myLon:a.longitude})}),(function(e){return C.a.alert("Please Enable Your GPS. Error Message: "+e.message+"Error Code: "+e.code)}),{enableHighAccuracy:!0,timeout:5e3,maximumAge:1e5})}},{key:"render",value:function(){return g.a.createElement(g.a.Fragment,null,g.a.createElement(A.a,{style:O.safeArea},g.a.createElement(_.a,{style:O.container},g.a.createElement(R.a,{source:T.a,style:O.img,imageStyle:{resizeMode:"repeat"}},g.a.createElement(_.a,{style:O.logoContainer},g.a.createElement(k.a,{source:D.a,style:O.logo,alt:"Logo"})),g.a.createElement(j.a,{style:O.touchableOpacity,onPress:this.getForeCast},g.a.createElement(B.a,{style:O.welcome},"Fore-Cast")),g.a.createElement(B.a,{style:O.welcome},"Temp: ",this.state.temp," Fehrenheit"),g.a.createElement(B.a,{style:O.welcome},"Humidity: ",this.state.humidity,"%"),g.a.createElement(B.a,{style:O.welcome},"Wind Speed: ",this.state.windSpeed,"/mph"),g.a.createElement(B.a,{style:O.welcome},"Forecast: ",this.state.weatherDescription),g.a.createElement(B.a,{style:O.welcome},"Your Location:"," "+this.state.city+" "+this.state.state+" "+this.state.zip),g.a.createElement(_.a,{style:{width:"100%",borderBottomColor:"black",borderBottomWidth:1,textAlign:"center",justifyContent:"center"}}),g.a.createElement(B.a,{style:O.welcome},"Golf Results Closest To You:"),g.a.createElement(_.a,{style:{width:"100%",borderBottomColor:"black",borderBottomWidth:1,textAlign:"center",justifyContent:"center"}}),g.a.createElement(_.a,null,this.state.placesToGolf.filter((function(e){return e})).map((function(e){return g.a.createElement(_.a,{key:e.id},g.a.createElement(_.a,{style:{height:"20px"}}),g.a.createElement(B.a,{style:O.welcome},e.name),g.a.createElement(B.a,{style:O.welcome,onPress:function(){v.a.openURL("tel:"+e.display_phone)}},e.display_phone),g.a.createElement(B.a,{style:O.welcome},e.location.display_address[0]),g.a.createElement(B.a,{style:O.welcome},e.location.display_address[1]),g.a.createElement(B.a,{style:O.welcome},e.location.display_address[2]),g.a.createElement(B.a,{style:O.welcome},"Rating: ",e.rating,"/5"),g.a.createElement(_.a,{style:{height:"20px"}}),g.a.createElement(_.a,{style:{width:"100%",borderBottomColor:"black",borderBottomWidth:1,textAlign:"center",justifyContent:"center"}}))}))),g.a.createElement(y.a,{style:"auto"})))))}}]),a}(f.Component),O=L.a.create({safeArea:{height:"100%"},container:{flex:1,backgroundColor:"#fff",alignItems:"center",justifyContent:"center"},logoContainer:{alignItems:"center",justifyContent:"center",paddingBottom:"50px",paddingTop:"50px"},touchableOpacity:{alignItems:"center",justifyContent:"center",width:"50%",height:"50px",marginLeft:"25%",marginBottom:"20px",backgroundColor:"#009688",borderRadius:10},welcome:{fontSize:20,fontWeight:"bold",textAlign:"center",justifyContent:"center"},title:{fontSize:20,fontWeight:"bold",textAlign:"center",justifyContent:"center"},img:{textAlign:"center",height:"100%",width:"100%",justifyContent:"center"},logo:{textAlign:"center",height:"200px",width:"200px",justifyContent:"center"}});Object(n.a)(G)},49:function(e,t,a){e.exports=a.p+"static/media/golf2.4e67ef83.png"},50:function(e,t,a){e.exports=a.p+"static/media/golfBall.4daa5f5c.svg"},75:function(e,t,a){e.exports=a(106)}},[[75,1,2]]]);
//# sourceMappingURL=app.d455e7c1.chunk.js.map