import { get } from "../../../Core/Http";


export default class HomeController
{

    @get("/v1/")
    indexAction(request, response)
    {
        return response.json({
            status: "Success",
            message: "API is up and working"
        });
    }

}