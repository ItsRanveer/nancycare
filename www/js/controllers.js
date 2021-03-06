angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PatientsCtrl', function($scope,socket,api, $rootScope, pstatus) {

  function getAge(dateString) 
  {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
      {
          age--;
      }
      return age;
}
  $rootScope.patients = []; 
  api.getPatient('a102').success(function(data) {
    data.age = getAge(data.birthDate);
    data.id = 'a102';
    if(data.gender.coding[0].code == "M") {
      data.image = 'http://api.randomuser.me/portraits/med/men/6.jpg';  
    } else {
      data.image = 'http://api.randomuser.me/portraits/med/women/4.jpg';
    }

    
    $rootScope.patients.push(data);
     $rootScope.patients[0].alert =  false;
  $rootScope.patients[0].status =  pstatus.get(1);
  });
  /*$scope.patients = [{
    "id":"1",
    "name": "Armand Valencia",
    "phone": "1-398-201-9251",
    "picture": "41908",
    "status" : "ion-checkmark-circled green"
  },
  {
    "id":"2",
    "name": "Chase Perez",
    "phone": "1-257-823-6820",
    "picture": "63324",
    "status" : "ion-alert red"
  },
  {
    "id":"3",
    "name": "Nasim Blake",
    "phone": "1-961-694-5994",
    "picture": "23753",
    "status" : "ion-checkmark-circled green"
  },
  {
    "id":"4",
    "name": "Ronan Schmidt",
    "phone": "1-925-808-4779",
    "picture": "10632",
    "status" : "ion-alert red"
  },
  {
    "id":"5",
    "name": "Malcolm Hancock",
    "phone": "1-316-162-9468",
    "picture": "57091",
    "status" : "ion-checkmark-circled green"
  }];*/

  var sock  = socket.get();
 
  sock.on('abnormal', function(text) {
  //console.log(text);
     if($rootScope.patients[0]) {
        console.log(text);
        if(text) {
          $rootScope.patients[0].alert =  true;
          $rootScope.patients[0].status =  pstatus.get(2);
          $rootScope.$apply();
        }    
      }
  })


  sock.on('MDC_PULS_OXIM_PULS_RATE', function(text) {
     console.log(text);
     if($rootScope.patients[0]) {
         console.log(text);
          $rootScope.patients[0].pulse =  text.value;
          $rootScope.$apply();
        }    
  })

})

.controller('PatientCtrl', function($scope, $stateParams, $rootScope,$ionicLoading,$location) {

console.log($rootScope.patients);
  $scope.patient = $rootScope.patients == undefined ? [] : $rootScope.patients[0];

  $scope.doctors = [{
        "name": "Josephine Donovan",
        "phone": "(08) 8939 8836",
        "email": "FemaleName@secure.philips.com"
      },
      {
        "name": "Jaquelyn Kirby",
        "phone": "(01) 4229 9910",
        "email": "FemaleName@secure.philips.com"
      },
      {
        "name": "Teagan Giles",
        "phone": "(02) 6537 9115",
        "email": "FemaleName@secure.philips.com"
      },
      {
        "name": "Cassady Morton",
        "phone": "(07) 9957 1737",
        "email": "FemaleName@secure.philips.com"
      },
      {
        "name": "Lavinia Hamilton",
        "phone": "(09) 0541 5498",
        "email": "FemaleName@secure.philips.com"
      },
      {
        "name": "Hilary Reyes",
        "phone": "(03) 6915 4495",
        "email": "FemaleName@secure.philips.com"
      },
      {
        "name": "Hyacinth Mcmillan",
        "phone": "(05) 1599 2183",
        "email": "FemaleName@secure.philips.com"
      }];

  $scope.messages  = [{
        "name" : "John Carry",
        "pic" : "http://bucketadmin.themebucket.net/images/chat-user-thumb.png",
        "time" : "10:00 AM",
        "message" : "Hello!",
        "class" : ""
      },{
        "name" : "Lisa Peterson",
        "pic" : "http://bucketadmin.themebucket.net/images/chat-user-thumb-f.png",
        "time" : "10:00 AM",
        "message" : "Hi, How are you? What about our next meeting?",
        "class" : "odd"
      },{
        "name" : "John Carry",
        "pic" : "http://bucketadmin.themebucket.net/images/chat-user-thumb.png",
        "time" : "10:00 AM",
        "message" : "Yeah everything is fine",
        "class" : ""
      },{
        "name" : "Lisa Peterson",
        "pic" : "http://bucketadmin.themebucket.net/images/chat-user-thumb-f.png",
        "time" : "10:00 AM",
        "message" : "Wow that's great",
        "class" : "odd"
      }];
  $scope.message = {
        "name" : "Lisa Peterson",
        "pic" : "http://bucketadmin.themebucket.net/images/chat-user-thumb-f.png",
        "time" : "10:00 AM",
        "message" : "",
        "class" : "odd"
  };
  $scope.sendChat = function(){
    var chat = JSON.stringify($scope.message) ;
    $scope.messages.push(JSON.parse(chat));
    var chatEl = document.getElementById("mychatelement");
    chatEl.scrollTop = chatEl.scrollHeight;
    $scope.message.message = "";
  }

  $scope.inform = function(name){
     $ionicLoading.show({ template: 'Notification sent to '+name, noBackdrop: true, duration: 2000 });
     $location.path("/app/patients/1");
  }

  $scope.chart = null;

  $scope.showGraph = function() {
      $scope.chart = c3.generate({
          bindto: '#chart',
          data: {
            columns: [
              ['data1', 7,8,9,7,8,6,9,10,8,5,9,8]
            ],
            types: {
                data1: 'area-spline'
            }
          },
          size: {
            height: 180
          }
      });  

      $scope.chart1 = c3.generate({
          bindto: '#chart1',
          data: {
              columns: [
                  ['data', 3]
              ],
              type: 'gauge',
          },
          gauge: {
              min: 0,
              max: 10,
              label: {
                format: function (value, ratio) {
                  return value;
                }
              }
          }
      });
  }


})
.controller('LoginCtrl', function($scope, $stateParams,$location,$ionicLoading) {
  //document.getElementsByClassName("ion-navicon")[1].style.display doLogin
  $scope.doLogin =  function(){
    $location.path("/app/patients");
  }
})
.controller('ScheduleCtrl',function($scope, $stateParams,$ionicLoading,$location) {
  $scope.schedule = function(){
    $ionicLoading.show({ template: 'Schedule Added Successfullly!', noBackdrop: true, duration: 2000 });
    $location.path("/app/patients/1");
  }
});
