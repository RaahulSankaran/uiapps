var app=angular.module("myapp", ['ngRoute']);

app.config(['$routeProvider',function($routeProvider){
    $routeProvider.
    when('/',{templateUrl:'pages/main.html',controller:'homeCtrl'}).
    when('/map',{templateUrl:'pages/map.html',controller:'mapCtrl'})
    .when('/dash',{templateUrl:'pages/dashboard.html',controller:'dashCtrl'})
    .when('/about',{templateUrl:'pages/about.html',controller:'aboutCtrl'})
    .when('/contact',{templateUrl:'pages/contact.html',controller:'contactCtrl'})
    .otherwise({
        redirectTo: '/'})
}]);

app.controller("aboutCtrl",function($scope){
  $scope.message="About Us";
  console.log("AboutPage");
});
app.controller("homeCtrl", function($scope) {
   $scope.title="HomePage";
   console.log("homePageLoaded");
});       
app.controller("mapCtrl",function($scope){
    $scope.message="Raahul";
    console.log("mapLoaded");
});
//index
app.controller("indexCtrl",function($scope){
   $scope.openNav=function() {
        console.log("open");
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
    }
    
    $scope.closeNav=function() {
        console.log("close");
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft= "0";
    }
});
app.controller("mapCtrl",function(){
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -33.8688, lng: 151.2195},
        zoom: 13,
        mapTypeId: 'roadmap'
      });

      // Create the search box and link it to the UI element.
      var input = document.getElementById('pac-input');
      var searchBox = new google.maps.places.SearchBox(input);
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      // Bias the SearchBox results towards current map's viewport.
      map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
      });

      var markers = [];
      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }

        // Clear out the old markers.
        markers.forEach(function(marker) {
          marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
          if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
          }
          var icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };

          // Create a marker for each place.
          markers.push(new google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            position: place.geometry.location
          }));

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });
});
//DashCtrl
app.controller("dashCtrl",function($scope){
  $scope.message="Dashboard";
  console.log("DashBoardLoaded");
  $scope.lineChart=function(){
    console.log("LineChart Loaded");
    function drawChart() {
      // Define the chart to be drawn.
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Month');
      data.addColumn('number', 'Language Scores Yr 2016');
      data.addColumn('number', 'Language Scores Yr 2017');
      data.addRows([
        ['Jan', 100,105],
        ['Mar', 50,40],
        ['Jun', 110,110],
        ['Aug', 75,85],
        ['Sept', 75,95],
        ['Oct', 35,55],
        ['Dec',120,120]
      ]);
      
      // Set chart options
      var options = {
         chart: {
            title: 'Language Scores Year 2016-2017',
            subtitle: 'Source: RaahulGokul'
         },   
         hAxis: {
            title: 'Month',         
         },
         vAxis: {
            title: 'Scores',        
         }, 
         'width':550,
         'height':400,
         axes: {
            x: {
               0: {side: 'top'}
            }      
         }      
      };

      // Instantiate and draw the chart.
      var chart = new google.charts.Line(document.getElementById('container'));
      chart.draw(data, options);
   }
   google.charts.setOnLoadCallback(drawChart);
  }
  $scope.pieChart=function(){
    console.log("pie Chart Load");
    function drawChart() {
      // Define the chart to be drawn.
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Month');
      data.addColumn('number', 'Scores of 2016');
      data.addColumn('number','Scores of 2017')
      data.addRows([
         ['Jan', 100,105],
         ['Mar', 50,40],
         ['Jun', 110,110],
         ['Aug', 75,85],
         ['Sept', 75,95],
         ['Oct', 35,55],
         ['Dec',120,120]
      ]);
         
      // Set chart options
      var options = {
         'title':'Language Scores Year 2016-2017',
         'width':550,
         'height':400,
         pieHole: 0.4
      };

      // Instantiate and draw the chart.
      var chart = new google.visualization.PieChart(document.getElementById('container1'));
      chart.draw(data, options);
   }
   google.charts.setOnLoadCallback(drawChart);
  }
});