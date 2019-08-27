import CarController from "./Controllers/CarController.js";


class App {
    constructor() {
        this.controllers = {
            carCtrl: new CarController(),
            houseController: new HouseController()
        }
    }
}

window['app'] = new App()