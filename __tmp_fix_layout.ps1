$p='app/layout.tsx'
$raw=Get-Content $p -Raw
$raw=$raw -replace 'import type \{ Metadata \} from "next";','import type { Metadata, Viewport } from "next";'
$raw=$raw -replace '\r?\n\s*themeColor: "#f7f4ed",',''
if($raw -notmatch 'export const viewport: Viewport'){
  $raw=$raw -replace '(\r?\n\};\r?\n)(\r?\nfunction Footer\(\))',"$1`r`nexport const viewport: Viewport = {`r`n  themeColor: \"#f7f4ed\",`r`n};`r`n$2"
}
Set-Content $p $raw -Encoding UTF8
