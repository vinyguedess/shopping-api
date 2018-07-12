import ProductsController from "./Controllers/ProductsController";



export default {
    initialize: () =>
    {
        loadControllers();
    }
}


const loadControllers = () => [
    new ProductsController()
];