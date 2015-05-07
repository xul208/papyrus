function ltrim(s) { sub(/^[ \t\r\n]+/, "", s); return s }
function rtrim(s) { sub(/[ \t\r\n]+$/, "", s); return s }
function trim(s) { return rtrim(ltrim(s)); }
function escape(s) { gsub(/[\"\\\}\{]/, "\'", s); return s }
BEGIN{FS="|"; print"\{";}
{
    if(trim($1) ~ /^[0-9]+$/)
    {
        print "\""trim($1)"\":";
        print "\""escape($2)"\",";
    }
}
END{print "\"\"\:\"\"\}"}
