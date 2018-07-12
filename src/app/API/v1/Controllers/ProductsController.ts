import { get } from "../../../Core/Http";


export default class ProductsController
{

    @get("/v1/products")
    public indexAction()
    {
        return [];
    }

}