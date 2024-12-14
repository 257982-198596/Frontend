$apiUrl = "http://localhost:18190/api/notificaciones/procesar-vencimientos"
$headers = @{
    "Content-Type" = "application/json; charset=UTF-8"
}

Invoke-RestMethod -Uri $apiUrl -Method Post -Headers $headers