import { get } from "../Http";


export default class HomeController
{

    @get("/")
    indexAction(request, response)
    {
        return response.json({
            status: "Success",
            message: "API is up and working"
        });
    }

}