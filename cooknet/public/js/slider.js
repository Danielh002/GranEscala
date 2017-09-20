angular.module('app', ['ui.bootstrap']);
function CarouselControl($scope){
  $scope.myInterval = 3000;
  $scope.slides = [
    {
      image: './images/slides/1.jpg'
    },
    {
      image: './images/slides/2.jpg'
    },
    {
      image: 'http://lorempixel.com/400/200/sports'
    },
    {
      image: 'http://lorempixel.com/400/200/people'
    }
  ];
}