$apiUrl = "https://backend-proyecto-integrador-257982-198596-edhucddfd5axfwhe.eastus-01.azurewebsites.net/api/notificaciones/procesar-vencimientos"
$headers = @{
    "Content-Type" = "application/json; charset=UTF-8"
}

Invoke-RestMethod -Uri $apiUrl -Method Post -Headers $headers