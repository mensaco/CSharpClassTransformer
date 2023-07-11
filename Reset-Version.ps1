Set-Location $PSScriptRoot

foreach ($fileToVersion in  ".\index.html", ".\index.js") {
    $currentIndexHtml = Get-Content -Path $fileToVersion -Encoding UTF8
    $currentIndexHtml = $currentIndexHtml -replace '\?v=([a-f0-9\.-]+)"', "?v=$([System.Guid]::NewGuid().ToString())`""
    $currentIndexHtml | Set-Content -Path $fileToVersion -Encoding UTF8
}

npx update-browserslist-db@latest


