//#snippet runrequire
require({
  baseUrl: "../../",

  packages: [
    {name: "dojo", location: "./samples/lib/dojo"},
    {name: "luciad", location: "./luciad"},
    
    {name: "demo", location: "./demos/demo41Queretaro/js"},
    {name: "datos", location: "./demos/demo41Queretaro/data"},
    {name: "recursos", location: "./proyecto/recursos"},
    {name: "samples", location: "./samples"},
    {name: "file", location: "./samples/model/File/js/file"}
  ]
//#endsnippet runrequire
  , cache: {}
//#snippet runrequirecont
}, ["demo"]);