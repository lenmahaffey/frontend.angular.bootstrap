import { HttpHeaders } from "@angular/common/http"
import { environment } from "src/environments/environment"

export class Constants
{
  public static apiRootUrl = environment.apiRootUrl

  public static headers =  new HttpHeaders({
        'Content-Type': 'application/json'
    })

  public static wait = async (timeToWaitInSeconds: number) => {
    await new Promise(resolve => {
        return setTimeout(resolve, timeToWaitInSeconds * 1000)
    })
  }
}
