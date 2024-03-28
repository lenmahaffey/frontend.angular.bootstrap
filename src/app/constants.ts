import { HttpHeaders } from "@angular/common/http"
import { MatDialog, MatDialogConfig } from "@angular/material/dialog"
import { environment } from "src/environments/environment"

export class Constants
{
  public static apiRootUrl = environment.apiRootUrl
  public static headers =  new HttpHeaders({
        'Content-Type': 'application/json'
    })

  public static GetModalConfig(): MatDialogConfig
  {
    const bodyRect = document.body.getBoundingClientRect();
    const config: MatDialogConfig = new MatDialogConfig();
    config.minWidth = 400
    config.position =
    {
      right: ((bodyRect.width / 2) - ( config.minWidth / 2) ).toString() + "px",
      top: '7%'
    }
    config.disableClose = true;
    return config
  }
}
