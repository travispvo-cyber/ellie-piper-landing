# Ellie & Piper Storybook Image Downloader
# Run this script in PowerShell to download all storybook images

$outputDir = $PSScriptRoot
$urls = @(
    @{name="scene-00-cover.png"; url="https://lh3.googleusercontent.com/gg/AMW1TPoYYBi4cYw8LQdQWokieizBUOO2eed2QADS5INPO7vQvH97jB_CYcJzKHMVBsUktsKPL6X2St57WybnByyTYcldk58zdKDHygAg1criu7YVoLNwSuuMUuflDWy37-EZYCEmj7Kt4IH4CnL9RYSlkAa_XF3FWEbbfXAXg_A50fGNwMzsdB7M=s0-mp2"},
    @{name="scene-01.png"; url="https://lh3.googleusercontent.com/gg/AMW1TPpzNHvkf1Wgw12zQHXwJR6lS5GDYg4GIDsMDblQIpt6SEzjfhLdMpT-Yh38dHCNclvMukKEkMmPcvCatZzVmfQWsI888HrkC9vTuEAl0HMMi0VyuJQa4TDh785He3zGwRCXpe0aTWJSYnLj8wTB9wLi9_up5bdd1oENilk99qUNjaLAJ96H=s0-mp2"},
    @{name="scene-02.png"; url="https://lh3.googleusercontent.com/gg/AMW1TPoB6JldzeBdmhU-vdVSaWncZVNtFYPYZ1vTB1LfJvDxYegMr9pGcJ5wqyim2_7cgaXD-0XKswrm7c6iD75uPEff65i_pIC-ZekMy3ylKbMKewr_vvCBWTUd6QXagwIC9I6ekbvNPLQasqBkK6wJtaQSAHsZWk5Dfpg8KhROM_JkGxDBr6o=s0-mp2"},
    @{name="scene-03.png"; url="https://lh3.googleusercontent.com/gg/AMW1TPrfIs-5z4jhXqHuTFFN_D8fV3DeGC90yFih7qDtfSzQhVcnpa3007bja9-Pbq9TmoYxYgFQu174WbGhJQWUhSVWdxHD5l5a6KSahksHFL0k4x7qK1G9KX4VzObSIeoNGlAmsLg04ZEeWeq6XvhzA5B4PiXt_WNSs5X2SWA38MmpcZGyGFFR=s0-mp2"}
)

Write-Host "Downloading Ellie & Piper Storybook Images..." -ForegroundColor Cyan
Write-Host "Output directory: $outputDir" -ForegroundColor Gray

foreach ($img in $urls) {
    $outPath = Join-Path $outputDir $img.name
    Write-Host "Downloading $($img.name)..." -NoNewline
    try {
        Invoke-WebRequest -Uri $img.url -OutFile $outPath -UseBasicParsing
        Write-Host " Done!" -ForegroundColor Green
    } catch {
        Write-Host " Failed: $_" -ForegroundColor Red
    }
}

Write-Host "`nDownload complete! Check the folder for your images." -ForegroundColor Cyan
