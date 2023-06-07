// МИСИС
let center=[55.727012351138704,37.60762971093732]
// Бескудниковский бульвар, 5
let storage1=[55.85997626676258,37.560741226910196]
// Большая Семёновская улица, 27к2
let storage2=[55.782406093049545,37.709461924594166]
// Юго-Восточная хорда
let storage3=[55.731080177654185,37.72491446097711]
// аллея Кремлёвских Курсантов
let storage4=[55.67656187394905,37.788671129787346]
// 16-й микрорайон
// Москва, Южный административный округ, район Орехово-Борисово Южное
let storage5=[55.605923293017,37.745065434228025]
// район Чертаново Южное
// Москва, Южный административный округ
let storage6=[55.57967671483916,37.585763676415525]
// район Тропарёво-Никулино
// Москва, Западный административный округ
let storage7=[55.6589794937392,37.47679272621862]
// глобальная перменная с широтой и долготой нашего класса
var yourAddress
// глобальная переменная с меткой нашого адреса
var yourpos
// глобальная переменная с веденным адресом
var textyouraddress
// глобальная переменная в которой находится карта
var mapinit
// глобальная переменная маршрута 
var multiRoute
//пемерменная масс сторон графа
var graphmass=[]
// Отрисованные маршруты
var multiroutes=[]

async function getData() {
    if(yourpos != null)
    {
        mapinit.geoObjects.remove(multiRoute);
        mapinit.geoObjects.remove(yourpos);
        yourAddress = null;
        yourpos=null;
    }
    
        var addressInput = document.getElementById('myInput');
        textyouraddress = addressInput.value;
        console.log('Введенное значение:', textyouraddress);
        var myGeocoder = ymaps.geocode(textyouraddress);
        res = myGeocoder.then(
            function (result) {
                yourAddress =  result.geoObjects.get(0).geometry.getCoordinates();
                console.log(yourAddress);
                yourpos=  new ymaps.Placemark([yourAddress[0],yourAddress[1]],{},{

                iconLayout: 'default#image',
                iconImageHref:'./img/placeholder.png',
                iconImageSize:[40,40],
                iconImageOffset:[-30,-30]});
                mapinit.geoObjects.add(yourpos);
                
                
                },
                function (err) {
                alert('Введите данные');
            },
            
            
        );
    await createRoute();
    
        
     
} 
async function getTable(){
    await createactiveway();
    console.log("граф"+graphmass);
    await shurtway();
}
// инициализация яндекс карты
async function init(){
    mapinit = await  new ymaps.Map('yandexmap',{
        center: center,
        zoom: 10
    });
    let placemark1=new ymaps.Placemark(storage1,{
        balloonContentHeader:'Склад №1',
        balloonContentBody:'Время работы : 24/7',
        balloonContentFooter: 'Москва, Бескудниковский бульвар, 5'

    },{
        iconLayout: 'default#image',
        iconImageHref:'./img/boxes.png',
        iconImageSize:[40,40],
        iconImageOffset:[-30,-30]

    });
    let placemark2=new ymaps.Placemark(storage2,{
        balloonContentHeader:'Склад №2',
        balloonContentBody:'Время работы : 24/7',
        balloonContentFooter: 'Москва, Большая Семёновская улица, 27, корп. 1'
    },{
        iconLayout: 'default#image',
        iconImageHref:'./img/boxes.png',
        iconImageSize:[40,40],
        iconImageOffset:[-30,-30]

    });
    let placemark3=new ymaps.Placemark(storage3,{
        balloonContentHeader:'Склад №3',
        balloonContentBody:'Время работы : 24/7',
        balloonContentFooter: 'Москва, Нижегородская улица, 79с1'
    },{
        iconLayout: 'default#image',
        iconImageHref:'./img/boxes.png',
        iconImageSize:[40,40],
        iconImageOffset:[-30,-30]

    });
    let placemark4=new ymaps.Placemark(storage4,{
        balloonContentHeader:'Склад №4',
        balloonContentBody:'Время работы : 24/7',
        balloonContentFooter: 'Москва, улица Перерва, 90'
    },{
        iconLayout: 'default#image',
        iconImageHref:'./img/boxes.png',
        iconImageSize:[40,40],
        iconImageOffset:[-30,-30]

    });
    let placemark5=new ymaps.Placemark(storage5,{
        balloonContentHeader:'Склад №5',
        balloonContentBody:'Время работы : 24/7',
        balloonContentFooter: 'Москва, Тамбовская улица, 1'
    },{
        iconLayout: 'default#image',
        iconImageHref:'./img/boxes.png',
        iconImageSize:[40,40],
        iconImageOffset:[-30,-30]

    });
    let placemark6=new ymaps.Placemark(storage6,{
        balloonContentHeader:'Склад №6',
        balloonContentBody:'Время работы : 24/7',
        balloonContentFooter: 'Москва, Варшавское шоссе, 170Г, стр. 29'
    },{
        iconLayout: 'default#image',
        iconImageHref:'./img/boxes.png',
        iconImageSize:[40,40],
        iconImageOffset:[-30,-30]

    });
    let placemark7=new ymaps.Placemark(storage7,{
        balloonContentHeader:'Склад №7',
        balloonContentBody:'Время работы : 24/7',
        balloonContentFooter: 'Москва, проспект Вернадского, 88'
    },{
        iconLayout: 'default#image',
        iconImageHref:'./img/boxes.png',
        iconImageSize:[40,40],
        iconImageOffset:[-30,-30]

    });
    
    await mapinit.controls.remove('searchControl');
    await mapinit.controls.remove('searchControl');
   await mapinit.controls.remove('geolocationControl');
    await mapinit.geoObjects.add(placemark1).add(placemark2)
    .add(placemark3).add(placemark4).add(placemark5).add(placemark6).add(placemark7);
   
}
// построение маршрутов
async function createRoute()
{
   
    if(yourpos == null)
    {
        console.log("удален старый маршрут")
        multiroutes.forEach(function(multiroute) {
            mapinit.geoObjects.remove(multiroute);
          });
    }
     // Создадим мультимаршрут и добавим его на карту.
    var multiRoute = await new ymaps.multiRouter.MultiRoute({
            
        referencePoints: [textyouraddress, storage1],
        params: {
            avoidTrafficJams: true,
            routingMode: "auto"  
        }
    },{ 
        wayPointVisible:false, 
        routeStrokeWidth: 2,
        routeActiveStrokeWidth: 6,
    });
    multiroutes[0]=multiRoute;
    mapinit.geoObjects.add(multiRoute);


    var multiRoute2 = await new ymaps.multiRouter.MultiRoute({
        
        referencePoints: [textyouraddress,storage7],
        params: {
            avoidTrafficJams: true,
            routingMode: "auto"  
        }
    },{ 
        wayPointVisible:false,
        routeStrokeWidth: 2,
        routeStrokeColor: "#000088",
        routeActiveStrokeWidth: 6,
        routeActiveStrokeColor: "#E63E92",
        
    });
    multiroutes[1] = multiRoute2;
    mapinit.geoObjects.add(multiRoute2);

    var multiRoute3 = await new ymaps.multiRouter.MultiRoute({
        
        referencePoints: [textyouraddress,storage6],
        params: {
            avoidTrafficJams: true,
            routingMode: "auto"  
        }
    },{ 
        wayPointVisible:false,
        routeStrokeWidth: 2,
        routeActiveStrokeWidth: 6,
        routeActiveStrokeColor: "#009a63",
        
    });
    multiroutes[2] = multiRoute3;
    mapinit.geoObjects.add(multiRoute3);

    var multiRoute4 = await new ymaps.multiRouter.MultiRoute({
        
        referencePoints: [textyouraddress,storage5],
        params: {
            avoidTrafficJams: true,
            routingMode: "auto"  
        }
    },{ 
        wayPointVisible:false,
        routeStrokeWidth: 2,
        routeActiveStrokeWidth: 6,
        routeActiveStrokeColor: "#30626b",
        
    });
    multiroutes[3] = multiRoute4;
    mapinit.geoObjects.add(multiRoute4);
    
    var multiRoute5 = await new ymaps.multiRouter.MultiRoute({
        
        referencePoints: [textyouraddress,storage4],
        params: {
            avoidTrafficJams: true,
            routingMode: "auto"  
        }
    },{ 
        wayPointVisible:false,
        routeStrokeWidth: 2,
        routeActiveStrokeWidth: 6,
        routeActiveStrokeColor: "#4c3c18",
        
    });
    multiroutes[4] = multiRoute5;
    mapinit.geoObjects.add(multiRoute5);
   var multiRoute6 = await new ymaps.multiRouter.MultiRoute({
        
        referencePoints: [textyouraddress,storage3],
        params: {
            avoidTrafficJams: true,
            routingMode: "auto"  
        }
    },{ 
        wayPointVisible:false,
        routeStrokeWidth: 2,
        routeActiveStrokeWidth: 6,
        routeActiveStrokeColor: "#45161c",
        
    });
    multiroutes[5] = multiRoute6;
    mapinit.geoObjects.add(multiRoute6);
    var multiRoute7 = await new ymaps.multiRouter.MultiRoute({
        
        referencePoints: [textyouraddress,storage2],
        params: {
            avoidTrafficJams: true,
            routingMode: "auto"  
        }
    },{ 
        wayPointVisible:false,
        routeStrokeWidth: 2,
        routeActiveStrokeWidth: 6,
        routeActiveStrokeColor: "#270a1f",
        
    });
    multiroutes[6] = multiRoute7;
    mapinit.geoObjects.add(multiRoute7);

    
}
// создание времени пути
async function createactiveway(){
    
    // var storages = [storage1,storage2,storage3,storage4,storage5,storage6,storage7]
    // storages.forEach(function(storage,index) {
    //     graphmas=null;
        
    // });

    // маршурут от вас до 1-ого склада
    var RouteY1=  new ymaps.multiRouter.MultiRoute({
        
        referencePoints: [textyouraddress,storage1],
        params: {
            avoidTrafficJams: true,
            routingMode: "auto"  
        }
    });
     RouteY1.model.events.add('requestsuccess',  function() {
        // Получение ссылки на активный маршрут.
        var activeRoute = RouteY1.getActiveRoute();
        graphmass[0] = activeRoute.properties.get("duration").text.replace(/мин./g, "");
    });
    // маршурут от вас до 2-ого склада
    var RouteY2=  new ymaps.multiRouter.MultiRoute({
            
        referencePoints: [textyouraddress,storage2],
        params: {
            avoidTrafficJams: true,
            routingMode: "auto"  
        }
    });
    RouteY2.model.events.add('requestsuccess', function() {
        // Получение ссылки на активный маршрут.
        var activeRoute = RouteY2.getActiveRoute();
        graphmass[1] = activeRoute.properties.get("duration").text.replace(/мин./g, "");
    });
     // маршурут от вас до 3-ого склада
     var RouteY3=  new ymaps.multiRouter.MultiRoute({
        
        referencePoints: [textyouraddress,storage3],
        params: {
            avoidTrafficJams: true,
            routingMode: "auto"  
        }
    });
    RouteY3.model.events.add('requestsuccess', function() {
        // Получение ссылки на активный маршрут.
        var activeRoute = RouteY3.getActiveRoute();
        graphmass[2] = activeRoute.properties.get("duration").text.replace(/мин./g, "");
    });
     // маршурут от вас до 4-ого склада
     var RouteY4=  new ymaps.multiRouter.MultiRoute({
        
        referencePoints: [textyouraddress,storage4],
        params: {
            avoidTrafficJams: true,
            routingMode: "auto"  
        }
    });
    RouteY4.model.events.add('requestsuccess', function() {
        // Получение ссылки на активный маршрут.
        var activeRoute = RouteY4.getActiveRoute();
        graphmass[3] = activeRoute.properties.get("duration").text.replace(/мин./g, "");
    });
     // маршурут от вас до 5-ого склада
     var RouteY5=  new ymaps.multiRouter.MultiRoute({
        
        referencePoints: [textyouraddress,storage5],
        params: {
            avoidTrafficJams: true,
            routingMode: "auto"  
        }
    });
    RouteY5.model.events.add('requestsuccess', function() {
        // Получение ссылки на активный маршрут.
        var activeRoute = RouteY5.getActiveRoute();
        graphmass[4] = activeRoute.properties.get("duration").text.replace(/мин./g, "");
    });
     // маршурут от вас до 6-ого склада
     var RouteY6=  new ymaps.multiRouter.MultiRoute({
        
        referencePoints: [textyouraddress,storage6],
        params: {
            avoidTrafficJams: true,
            routingMode: "auto"  
        }
    });
    RouteY6.model.events.add('requestsuccess', function() {
        // Получение ссылки на активный маршрут.
        var activeRoute = RouteY6.getActiveRoute();
        graphmass[5] = activeRoute.properties.get("duration").text.replace(/мин./g, "");
    });

     // маршурут от вас до 7-ого склада
     var RouteY7=  new ymaps.multiRouter.MultiRoute({
        
        referencePoints: [textyouraddress,storage7],
        params: {
            avoidTrafficJams: true,
            routingMode: "auto"  
        }
    });
    RouteY7.model.events.add('requestsuccess', function() {
        // Получение ссылки на активный маршрут.
        var activeRoute = RouteY7.getActiveRoute();
        graphmass[6] = activeRoute.properties.get("duration").text.replace(/мин./g, "");
    });

     // маршурут от 1-ого склада до 2-ого склада
     var Route12=  new ymaps.multiRouter.MultiRoute({
        
        referencePoints: [storage1,storage2],
        params: {
            avoidTrafficJams: true,
            routingMode: "auto"  
        }
    });
    Route12.model.events.add('requestsuccess', function() {
        // Получение ссылки на активный маршрут.
        var activeRoute = Route12.getActiveRoute();
        graphmass[7] = activeRoute.properties.get("duration").text.replace(/мин./g, "");
    });

     // маршурут от 1-ого склада до 3-ого склада
     var Route13=  new ymaps.multiRouter.MultiRoute({
        
        referencePoints: [storage1,storage3],
        params: {
            avoidTrafficJams: true,
            routingMode: "auto"  
        }
    });
    Route13.model.events.add('requestsuccess', function() {
        // Получение ссылки на активный маршрут.
        var activeRoute = Route13.getActiveRoute();
        graphmass[8] = activeRoute.properties.get("duration").text.replace(/мин./g, "");
    });

     // маршурут от 1-ого склада до 4-ого склада
     var Route14=  new ymaps.multiRouter.MultiRoute({
        
        referencePoints: [storage1,storage4],
        params: {
            avoidTrafficJams: true,
            routingMode: "auto"  
        }
    });
    Route14.model.events.add('requestsuccess', function() {
        // Получение ссылки на активный маршрут.
        var activeRoute = Route14.getActiveRoute();
        graphmass[9] = activeRoute.properties.get("duration").text.replace(/мин./g, "");
    });

     // маршурут от 1-ого склада до 5-ого склада
     var Route15=  new ymaps.multiRouter.MultiRoute({
        
        referencePoints: [storage1,storage5],
        params: {
            avoidTrafficJams: true,
            routingMode: "auto"  
        }
    });
    Route15.model.events.add('requestsuccess', function() {
        // Получение ссылки на активный маршрут.
        var activeRoute = Route15.getActiveRoute();
        graphmass[10] = activeRoute.properties.get("duration").text.replace(/мин./g, "");
    });

     // маршурут от 1-ого склада до 6-ого склада
     var Route16=  new ymaps.multiRouter.MultiRoute({
        
        referencePoints: [storage1,storage6],
        params: {
            avoidTrafficJams: true,
            routingMode: "auto"  
        }
    });
    Route16.model.events.add('requestsuccess', function() {
        // Получение ссылки на активный маршрут.
        var activeRoute = Route16.getActiveRoute();
        graphmass[11] = activeRoute.properties.get("duration").text.replace(/мин./g, "");
    });
     // маршурут от 1-ого склада до 7-ого склада
     var Route17=  new ymaps.multiRouter.MultiRoute({
        
        referencePoints: [storage1,storage7],
        params: {
            avoidTrafficJams: true,
            routingMode: "auto"  
        }
    });
    Route17.model.events.add('requestsuccess', function() {
        // Получение ссылки на активный маршрут.
        var activeRoute = Route17.getActiveRoute();
        graphmass[12] = activeRoute.properties.get("duration").text.replace(/мин./g, "");
    });
     // маршурут от 2-ого склада до 3-ого склада
     var Route23=  new ymaps.multiRouter.MultiRoute({
        
        referencePoints: [storage2,storage3],
        params: {
            avoidTrafficJams: true,
            routingMode: "auto"  
        }
    });
    Route23.model.events.add('requestsuccess', function() {
        // Получение ссылки на активный маршрут.
        var activeRoute = Route23.getActiveRoute();
        graphmass[13] = activeRoute.properties.get("duration").text.replace(/мин./g, "");
    });
     // маршурут от 2-ого склада до 4-ого склада
     var Route24=  new ymaps.multiRouter.MultiRoute({
        
        referencePoints: [storage2,storage4],
        params: {
            avoidTrafficJams: true,
            routingMode: "auto"  
        }
    });
    Route24.model.events.add('requestsuccess', function() {
        // Получение ссылки на активный маршрут.
        var activeRoute = Route24.getActiveRoute();
        graphmass[14] = activeRoute.properties.get("duration").text.replace(/мин./g, "");
    });
    // маршурут от 2-ого склада до 5-ого склада
    var Route25=  new ymaps.multiRouter.MultiRoute({
        
        referencePoints: [storage2,storage5],
        params: {
            avoidTrafficJams: true,
            routingMode: "auto"  
        }
    });
    Route25.model.events.add('requestsuccess', function() {
        // Получение ссылки на активный маршрут.
        var activeRoute = Route25.getActiveRoute();
        graphmass[15] = activeRoute.properties.get("duration").text.replace(/мин./g, "");
    });
    // маршурут от 2-ого склада до 6-ого склада
    var Route26=  new ymaps.multiRouter.MultiRoute({
        
        referencePoints: [storage2,storage6],
        params: {
            avoidTrafficJams: true,
            routingMode: "auto"  
        }
    });
    Route26.model.events.add('requestsuccess', function() {
        // Получение ссылки на активный маршрут.
        var activeRoute = Route26.getActiveRoute();
        graphmass[16] = activeRoute.properties.get("duration").text.replace(/мин./g, "");
    });
    // маршурут от 2-ого склада до 7-ого склада
    var Route27=  new ymaps.multiRouter.MultiRoute({
        
        referencePoints: [storage2,storage7],
        params: {
            avoidTrafficJams: true,
            routingMode: "auto"  
        }
    });
    Route27.model.events.add('requestsuccess', function() {
        // Получение ссылки на активный маршрут.
        var activeRoute = Route27.getActiveRoute();
        graphmass[17] = activeRoute.properties.get("duration").text.replace(/мин./g, "");
    });
    // маршурут от 3-ого склада до 4-ого склада
    var Route34=  new ymaps.multiRouter.MultiRoute({
        
        referencePoints: [storage3,storage4],
        params: {
            avoidTrafficJams: true,
            routingMode: "auto"  
        }
    });
    Route34.model.events.add('requestsuccess', function() {
        // Получение ссылки на активный маршрут.
        var activeRoute = Route34.getActiveRoute();
        graphmass[18] = activeRoute.properties.get("duration").text.replace(/мин./g, "");
    });
    // маршурут от 3-ого склада до 5-ого склада
    var Route35=  new ymaps.multiRouter.MultiRoute({
        
        referencePoints: [storage3,storage5],
        params: {
            avoidTrafficJams: true,
            routingMode: "auto"  
        }
    });
    Route35.model.events.add('requestsuccess', function() {
        // Получение ссылки на активный маршрут.
        var activeRoute = Route35.getActiveRoute();
        graphmass[19] = activeRoute.properties.get("duration").text.replace(/мин./g, "");
    });
    // маршурут от 3-ого склада до 6-ого склада
    var Route36=  new ymaps.multiRouter.MultiRoute({
        
        referencePoints: [storage3,storage6],
        params: {
            avoidTrafficJams: true,
            routingMode: "auto"  
        }
    });
    Route36.model.events.add('requestsuccess', function() {
        // Получение ссылки на активный маршрут.
        var activeRoute = Route36.getActiveRoute();
        graphmass[20] = activeRoute.properties.get("duration").text.replace(/мин./g, "");
    });
    // маршурут от 3-ого склада до 7-ого склада
    var Route37=  new ymaps.multiRouter.MultiRoute({
        
        referencePoints: [storage3,storage7],
        params: {
            avoidTrafficJams: true,
            routingMode: "auto"  
        }
    });
    Route37.model.events.add('requestsuccess', function() {
        // Получение ссылки на активный маршрут.
        var activeRoute = Route37.getActiveRoute();
        graphmass[21] = activeRoute.properties.get("duration").text.replace(/мин./g, "");
    });
    // маршурут от 4-ого склада до 5-ого склада
    var Route45=  new ymaps.multiRouter.MultiRoute({
        
        referencePoints: [storage4,storage5],
        params: {
            avoidTrafficJams: true,
            routingMode: "auto"  
        }
    });
    Route45.model.events.add('requestsuccess', function() {
        // Получение ссылки на активный маршрут.
        var activeRoute = Route45.getActiveRoute();
        graphmass[22] = activeRoute.properties.get("duration").text.replace(/мин./g, "");
    });
    // маршурут от 4-ого склада до 6-ого склада
    var Route46=  new ymaps.multiRouter.MultiRoute({
        
        referencePoints: [storage4,storage6],
        params: {
            avoidTrafficJams: true,
            routingMode: "auto"  
        }
    });
    Route46.model.events.add('requestsuccess', function() {
        // Получение ссылки на активный маршрут.
        var activeRoute = Route46.getActiveRoute();
        graphmass[23] = activeRoute.properties.get("duration").text.replace(/мин./g, "");
    });
    // маршурут от 4-ого склада до 7-ого склада
    var Route47=  new ymaps.multiRouter.MultiRoute({
        
        referencePoints: [storage4,storage5],
        params: {
            avoidTrafficJams: true,
            routingMode: "auto"  
        }
    });
    Route47.model.events.add('requestsuccess', function() {
        // Получение ссылки на активный маршрут.
        var activeRoute = Route47.getActiveRoute();
        graphmass[24] = activeRoute.properties.get("duration").text.replace(/мин./g, "");
    });
    // маршурут от 5-ого склада до 6-ого склада
    var Route56=  new ymaps.multiRouter.MultiRoute({
        
        referencePoints: [storage5,storage6],
        params: {
            avoidTrafficJams: true,
            routingMode: "auto"  
        }
    });
    Route56.model.events.add('requestsuccess', function() {
        // Получение ссылки на активный маршрут.
        var activeRoute = Route56.getActiveRoute();
        graphmass[25] = activeRoute.properties.get("duration").text.replace(/мин./g, "");
    });
    // маршурут от 5-ого склада до 7-ого склада
    var Route57=  new ymaps.multiRouter.MultiRoute({
        
        referencePoints: [storage5,storage7],
        params: {
            avoidTrafficJams: true,
            routingMode: "auto"  
        }
    });
    Route57.model.events.add('requestsuccess', function() {
        // Получение ссылки на активный маршрут.
        var activeRoute = Route57.getActiveRoute();
        graphmass[26] = activeRoute.properties.get("duration").text.replace(/мин./g, "");
    });
    // маршурут от 6-ого склада до 7-ого склада
    var Route67=  new ymaps.multiRouter.MultiRoute({
        
        referencePoints: [storage6,storage7],
        params: {
            avoidTrafficJams: true,
            routingMode: "auto"  
        }
    });
    Route67.model.events.add('requestsuccess', function() {
        // Получение ссылки на активный маршрут.
        var activeRoute = Route67.getActiveRoute();
        graphmass[27] = activeRoute.properties.get("duration").text.replace(/мин./g, "");
    });
   
}
ymaps.ready(init);
// Функция для поиска кратчайших путей от стартовой вершины
  async function bellmanFord(edges, startVertex) {
    const distances = [];
    const previousVertices = {};

  
    // Инициализация расстояний и предыдущих вершин
    distances[startVertex] = 0;
    previousVertices[startVertex] = null;
  
    // Релаксация ребер
    for (let i = 1; i < Object.keys(edges).length; i++) {
      edges.forEach(edge => {
        const { source, target, weight } = edge;
        if (distances[source] !== undefined && (distances[target] === undefined || distances[source] + weight < distances[target])) {
          distances[target] = distances[source] + weight;
          previousVertices[target] = source;
        }
      });
    }
  
    // Проверка наличия отрицательных циклов
    edges.forEach(edge => {
      const { source, target, weight } = edge;
      if (distances[source] + weight < distances[target]) {
        throw new Error('Граф содержит отрицательные циклы');
      }
    });
  
    return distances;
  }
//   Создание таблицы

  async function createTable(distances) {
    var table = document.createElement("table");
    var tableBody = document.createElement("tbody");
  
    distances.forEach(function(distance, index) {
      var row = document.createElement("tr");
      var cell1 = document.createElement("td");
      if(index != 0)
        {
        cell1.textContent = "Время в пути от вас до склада с номером № " + index ;
        var cell2 = document.createElement("td");
        cell2.textContent = distance !== Infinity ? distance.toString() : "Недостижимо";
        row.appendChild(cell1);
        row.appendChild(cell2);
        tableBody.appendChild(row);
        }
      
    });
  
    table.appendChild(tableBody);
    var tableContainer = document.querySelector("#tableContainer");
    tableContainer.innerHTML = "";
    tableContainer.appendChild(table);
  }
//  запись данных
  async function shurtway(){
    const edges = [
      { source: 0, target: 1, weight: parseInt(graphmass[0])  },
      { source: 0, target: 2, weight: parseInt(graphmass[1])  },
      { source: 0, target: 3, weight: parseInt(graphmass[2])  },
      { source: 0, target: 4, weight: parseInt(graphmass[3])  },
      { source: 0, target: 5, weight: parseInt(graphmass[4])  },
      { source: 0, target: 6, weight: parseInt(graphmass[5])  },
      { source: 0, target: 7, weight: parseInt(graphmass[6])  },
      { source: 1, target: 2, weight: parseInt(graphmass[7])  },
      { source: 1, target: 3, weight: parseInt(graphmass[8])  },
      { source: 1, target: 4, weight: parseInt(graphmass[9])  },
      { source: 1, target: 5, weight: parseInt(graphmass[10]) },
      { source: 1, target: 6, weight: parseInt(graphmass[11]) },
      { source: 1, target: 7, weight: parseInt(graphmass[12]) },
      { source: 2, target: 3, weight: parseInt(graphmass[13]) },
      { source: 2, target: 4, weight: parseInt(graphmass[14]) },
      { source: 2, target: 5, weight: parseInt(graphmass[15]) },
      { source: 2, target: 6, weight: parseInt(graphmass[16]) },
      { source: 2, target: 7, weight: parseInt(graphmass[17]) },
      { source: 3, target: 4, weight: parseInt(graphmass[18]) },
      { source: 3, target: 5, weight: parseInt(graphmass[19]) },
      { source: 3, target: 6, weight: parseInt(graphmass[20]) },
      { source: 3, target: 7, weight: parseInt(graphmass[21]) },
      { source: 4, target: 5, weight: parseInt(graphmass[22]) },
      { source: 4, target: 6, weight: parseInt(graphmass[23]) },
      { source: 4, target: 7, weight: parseInt(graphmass[24]) },
      { source: 5, target: 6, weight: parseInt(graphmass[25]) },
      { source: 5, target: 7, weight: parseInt(graphmass[26]) },
      { source: 6, target: 7, weight: parseInt(graphmass[28]) }
    ];
    
    const startVertex = 0;
    try {
        let distances = await bellmanFord(edges, startVertex);
        if (Array.isArray(distances)) {
          console.log('Кратчайшие расстояния:');
          console.log(distances);
    
          createTable(distances);
    
          console.log("Завершение работы");
        } else {
          throw new Error("distances не является массивом");
        }
      } catch (error) {
        console.error("Ошибка при вычислении кратчайших расстояний:", error);
      }
  }
  

